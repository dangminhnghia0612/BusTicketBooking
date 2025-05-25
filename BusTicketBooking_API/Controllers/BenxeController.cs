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
    public class BenxeController : ControllerBase
    {
        private readonly QLBanvexeDbContext _context;

        public BenxeController(QLBanvexeDbContext context)
        {
            _context = context;
        }
        [HttpGet("lay-ds-ben-xe-cua-tinh/{maTinh}")]
        public async Task<IActionResult> layDSBenXeCuaTinh(int maTinh)
        {
            try
            {
                var existTinh = await _context.Tinh.AnyAsync(t => t.MaTinh == maTinh);
                if (!existTinh)
                {
                    return NotFound(new { Message = "Không tìm thấy tỉnh này." });
                }
                var ds = await _context.Benxe.AsNoTracking()
                    .Where(bx => bx.MaQuanNavigation.MaTinh == maTinh)
                    .Select(bx => new
                    {
                        Mabenxe = bx.MaBenxe,
                        Tenbenxe = bx.Tenbenxe,
                    })
                    .ToListAsync();
                return Ok(ds);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Đã xảy ra lỗi khi lấy danh sách bến xe: " + ex.Message });
            }
        }
        [HttpGet]
        public async Task<IActionResult> layDSBenXe()
        {
            try
            {
                var dsBenXe = await _context.Benxe.AsNoTracking()
                                            .Select(bx => new
                                            {
                                                Mabenxe = bx.MaBenxe,
                                                Diachi = bx.Diachi,
                                                DiachiFull = bx.Diachi + ", " + bx.MaQuanNavigation.Ten + ", " + bx.MaQuanNavigation.MaTinhNavigation.Ten,
                                                Maquan = bx.MaQuan,
                                                Matinh = bx.MaQuanNavigation.MaTinh,
                                                Tenbenxe = bx.Tenbenxe,
                                                Sdt = bx.Sodienthoai
                                            })
                                            .ToListAsync();
                return Ok(dsBenXe);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi lấy ds xe.", Error = ex.Message });
            }
        }
        [HttpDelete("{mabenxe}")]
        public async Task<IActionResult> xoaBenXe(int mabenxe)
        {
            try
            {
                var benxe = await _context.Benxe.FindAsync(mabenxe);
                if (benxe == null)
                {
                    return NotFound(new { message = "Không tìm thấy bến xe" });
                }
                var lotrinh = await _context.Lotrinh.Where(lt => lt.MaBenxe == mabenxe).AnyAsync();
                if (lotrinh)
                {
                    return BadRequest(new { message = "Đã tồn tại lộ trình đi qua bến xe này" });
                }
                var xe = await _context.Xe.Where(x => x.MaBenxe == mabenxe).AnyAsync();
                if (xe)
                {
                    return BadRequest(new { message = "Đang có xe đậu ở bến này" });
                }

                _context.Benxe.Remove(benxe);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Xóa thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Xảy ra lỗi khi xóa bến xe: " + ex.Message });
            }
        }
        [HttpPost]
        public async Task<IActionResult> themBenXe([FromBody] BenxeRequestDTO dto)
        {
            try
            {
                var existingBenXe = await _context.Benxe.AnyAsync(bx => bx.Diachi == dto.Diachi && bx.MaQuan ==  dto.MaQuan);
                if (existingBenXe)
                {
                    return BadRequest(new { message = "Bến xe đã tồn tại" });
                }
                var benxe = new Benxe
                {
                    MaQuan = dto.MaQuan,
                    Tenbenxe = dto.Tenbenxe,
                    Diachi = dto.Diachi,
                    Sodienthoai = dto.Sodienthoai
                };
                _context.Benxe.Add(benxe);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Thêm thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Xảy ra lỗi khi thêm bến xe " + ex.Message });
            }
        }

        [HttpPut("{mabenxe}")]
        public async Task<IActionResult> suaXe(int mabenxe, [FromBody] BenxeRequestDTO dto)
        {
            try
            {
                var existingBenXe = await _context.Benxe.AnyAsync(bx => bx.Diachi == dto.Diachi && bx.MaQuan == dto.MaQuan && bx.MaBenxe != mabenxe);
                if (existingBenXe)
                {
                    return BadRequest(new { message = "Bạn đã sửa thông tin trùng với bến xe đã có." });
                }

                var benxe = await _context.Benxe.FindAsync(mabenxe);
                if (benxe == null)
                {
                    return NotFound(new { message = "Bến xe không tồn tại để chỉnh sửa." });
                }
                benxe.MaQuan = dto.MaQuan;
                benxe.Tenbenxe = dto.Tenbenxe;
                benxe.Diachi = dto.Diachi;
                benxe.Sodienthoai = dto.Sodienthoai;

                await _context.SaveChangesAsync();
                return Ok(new { message = "Sửa thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Xảy ra lỗi khi sửa bến xe " + ex.Message });
            }
        }

    }
}
