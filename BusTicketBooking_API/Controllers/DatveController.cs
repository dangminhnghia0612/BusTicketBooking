using BusTicketBooking_API.Data;
using BusTicketBooking_API.DTOs;
using BusTicketBooking_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BusTicketBooking_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DatveController : ControllerBase
    {
        private readonly QLBanvexeDbContext _context;
        public DatveController(QLBanvexeDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<IActionResult> themDatVe([FromBody] DatveRequestDTO dto)
        {
            try
            {
                var cx = await _context.Chuyenxe.Include(x => x.MaTuyenxeNavigation)
                                .FirstOrDefaultAsync(x => x.MaChuyenxe == dto.Ma_Chuyenxe);

                if (cx == null)
                {
                    return BadRequest(new { Message = "Chuyến xe không tồn tại" });
                }
                Datve datve = new Datve()
                {
                    MaChuyenxe = dto.Ma_Chuyenxe,
                    MaKhachhang = dto.Ma_Khachhang,
                    MaTinhtrang = 1,
                    Ngaydat = DateTime.Now,
                    Soluong = dto.Soluong,
                    Giagoc = dto.Giagoc,
                    Giasaukhuyenmai = dto.Giasaukhuyenmai,
                    Ghichu = dto.Ghichu,
                    Tenkhachhang = dto.Tenkhachhang,
                    Sodienthoai = dto.Sodienthoai,
                    Email = dto.Email
                };
                _context.Datve.Add(datve);
                await _context.SaveChangesAsync();


                foreach (var ghe in dto.dsGhe)
                {

                    Ghe g = await _context.Ghe.Where(x => x.Soghe == ghe && x.MaXe == cx.MaXe).FirstOrDefaultAsync();
                    if (g != null)
                    {
                        Chitietghe ctg = await _context.Chitietghe.Where(x => x.MaGhe == g.MaGhe && x.MaChuyenxe == dto.Ma_Chuyenxe).FirstOrDefaultAsync();
                        if (ctg != null && ctg.Trangthai == false)
                        {
                            ctg.Trangthai = true;
                            Vexe vx = new Vexe()
                            {
                                MaDatve = datve.MaDatve,
                                MaChitietghe = ctg.MaChitietghe,
                                Giave = cx.MaTuyenxeNavigation.Giave.Value,
                            };
                            _context.Vexe.Add(vx);

                        }
                        else
                        {
                            return BadRequest(new { Message = "Ghế đã có người đặt" });
                        }
                    }
                }

                await _context.SaveChangesAsync();
                return Ok(new
                {
                    MaDatve = datve.MaDatve,
                    Message = "Đặt vé thành công"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Đặt vé thất bại" + ex.Message });
            }
        }

    }
}
