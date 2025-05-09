using BusTicketBooking.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BusTicketBooking.API.Controllers
{
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
                                            .Select (x => new
                                            {
                                                Maxe = x.MaXe,
                                                Bienso = x.Bienso,
                                                Tenloai = x.MaLoaixeNavigation.Tenloai,
                                                Soghe = x.MaLoaixeNavigation.Soluongghe
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
                    return BadRequest(new { message = "Đã tồn tại chuyến xe có xe này tham gia"});
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
                return BadRequest(new { message = "Xảy ra lỗi khi xóa xe " + ex.Message });
            }
        }
    }
}
