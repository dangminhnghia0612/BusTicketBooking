using BusTicketBooking.API.Data;
using BusTicketBooking.API.DTOs;
using BusTicketBooking.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BusTicketBooking.API.Controllers
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
        public async Task<IActionResult> DatVe([FromBody] DatveRequestDTO dto)
        {
            try
            {
                Datve datve = new Datve()
                {
                    //MaChuyenxe = dto.Ma_Chuyenxe,
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
                Chuyenxe cx = await _context.Chuyenxe.FindAsync(dto.Ma_Chuyenxe);
                if (cx == null)
                {
                    return BadRequest(new { Message = "Chuyến xe không tồn tại" });
                }
                foreach (var ghe in dto.dsGhe)
                {

                    Ghe g = await _context.Ghe.Where(x => x.Soghe == ghe && x.MaXe == cx.MaXe).FirstOrDefaultAsync();
                    if (g != null && g.Trangthai == false)
                    {
                        g.Trangthai = true;
                    }
                    else
                    {
                        return BadRequest(new {Message = "Ghế đã có người đặt"});
                    }
                }
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    MaDatve = datve.MaDatve,
                    Message = "Đặt vé thành công!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Đặt vé thất bại" + ex.Message });
            }
        }
    }
}
