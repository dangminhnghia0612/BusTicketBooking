using BusTicketBooking_API.Data;
using BusTicketBooking_API.DTOs;
using BusTicketBooking_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BusTicketBooking_API.Controllers
{
    [Authorize(Roles = "1")]
    [Route("api/[controller]")]
    [ApiController]
    public class XeController : ControllerBase
    {
        private readonly QLBanvexeDbContext _context;
        public XeController(QLBanvexeDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> layDSXe()
        {
            try
            {
                var dsXe = await _context.Xe.AsNoTracking()
                                            .Select(x => new
                                            {
                                                Maxe = x.MaXe,
                                                Bienso = x.Bienso,
                                                Maloai = x.MaLoaixe,
                                                Tenloai = x.MaLoaixeNavigation.Tenloai,
                                                Soghe = x.MaLoaixeNavigation.Soluongghe,
                                                Tenxe = x.Ten,
                                                Mabenxe = x.MaBenxe,
                                                Noidauxe = x.MaBenxeNavigation.Tenbenxe,
                                                Matinh = x.MaBenxeNavigation.MaQuanNavigation.MaTinh,
                                            })
                                            .ToListAsync();
                return Ok(dsXe);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi lấy ds xe.", Error = ex.Message });
            }
        }
        [HttpDelete("{maxe}")]
        public async Task<IActionResult> xoaXe(int maxe)
        {
            try
            {
                var xe = await _context.Xe.Include(x => x.Ghe).FirstOrDefaultAsync(x => x.MaXe == maxe);
                if (xe == null)
                {
                    return NotFound(new { message = "Không tìm thấy xe" });
                }
                var chuyenxe = await _context.Chuyenxe.Where(cx => cx.MaXe == maxe).AnyAsync();
                if (chuyenxe)
                {
                    return BadRequest(new { message = "Đã tồn tại chuyến xe có xe này tham gia" });
                }
                //XÓA GHẾ -> XÓA XE
                if (xe.Ghe != null && xe.Ghe.Any())
                {
                    _context.Ghe.RemoveRange(xe.Ghe);
                }

                _context.Xe.Remove(xe);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Xóa thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Xảy ra lỗi khi xóa xe: " + ex.Message });
            }
        }
        [HttpPost("ThemXe")]
        public async Task<IActionResult> themXe([FromBody] XeRequestDTO dto)
        {
            try
            {
                var existingXe = await _context.Xe.AnyAsync(x => x.Bienso == dto.Bienso);
                if (existingXe)
                {
                    return BadRequest(new { message = "Biển số xe đã tồn tại" });
                }
                var xe = new Xe
                {
                    MaLoaixe = dto.MaLoaixe,
                    MaBenxe = dto.MaBenxe,
                    Bienso = dto.Bienso,
                    Ten = dto.Ten
                };
                _context.Xe.Add(xe);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Thêm thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Xảy ra lỗi khi thêm xe " + ex.Message });
            }
        }
        [HttpPut("{maxe}")]
        public async Task<IActionResult> suaXe(int maxe, [FromBody] XeRequestDTO dto)
        {
            try
            {
                var existingBienso = await _context.Xe.AnyAsync(x => x.Bienso == dto.Bienso && x.MaXe != maxe);
                if (existingBienso)
                {

                    return BadRequest(new { message = "Biển số xe đã tồn tại." });
                }

                var xe = await _context.Xe.FindAsync(maxe);
                if (xe == null)
                {
                    return NotFound(new { message = "Xe không tồn tại." });
                }
                xe.MaLoaixe = dto.MaLoaixe;
                xe.MaBenxe = dto.MaBenxe; 
                xe.Bienso = dto.Bienso;
                xe.Ten = dto.Ten;

                await _context.SaveChangesAsync();
                return Ok(new { message = "Sửa thành công" });
            }
            catch (Exception ex)
            { 
                return BadRequest(new { message = "Xảy ra lỗi khi sửa xe " + ex.Message });
            }
        }
        [HttpGet("layXeTheoNoiDau/{mabenxe}")]
        public async Task<IActionResult> layXeTheoNoiDau(int mabenxe)
        {
            try
            {
                var dsXe = await _context.Xe.AsNoTracking()
                                            .Include(x => x.MaLoaixeNavigation)
                                            .Where(x => x.MaBenxe == mabenxe)
                                            .Select(x => new
                                            {
                                                Maxe = x.MaXe,
                                                Bienso = x.Bienso,
                                                Loaixe = x.MaLoaixeNavigation.Tenloai
                                            })
                                            .ToListAsync();
                return Ok(dsXe);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi lấy ds xe.", Error = ex.Message });
            }
        }

    }
}
