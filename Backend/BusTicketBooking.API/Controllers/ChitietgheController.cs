using BusTicketBooking.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto.Digests;

namespace BusTicketBooking.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChitietgheController : ControllerBase
    {
        private readonly QLBanvexeDbContext _context;
        public ChitietgheController(QLBanvexeDbContext context)
        {
            _context = context;
        }
        [HttpPost(("layDSGheDaDat"))]
        public async Task<IActionResult> layDSGheDaDat([FromBody] int machuyenxe)
        {
            try
            {
                var cx = await _context.Chuyenxe.AnyAsync(t => t.MaChuyenxe == machuyenxe);
                if (!cx)
                {
                    return BadRequest(new { message = "Chuyến xe không tồn tại." });
                }
                var dsGheDaDat = await _context.Chitietghe.Where(x => x.MaChuyenxe == machuyenxe && x.Trangthai == true)
                                                          .Include(x => x.MaGheNavigation)
                                                          .Select(x => x.MaGheNavigation.Soghe)
                                                          .ToListAsync();
                return Ok(dsGheDaDat);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Xảy ra lỗi khi lấy ds ghế.", Error = ex.Message });
            }
        }
    }
}
