using BusTicketBooking_API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BusTicketBooking_API.Controllers
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
        [HttpGet(("layDSGheDaDat/{machuyenxe}"))]
        public async Task<IActionResult> layDSGheDaDat(int machuyenxe)
        {
            try
            {
                var cx = await _context.Chuyenxe.AnyAsync(t => t.MaChuyenxe == machuyenxe);
                if (!cx)
                {
                    return BadRequest(new { message = "Chuyến xe không tồn tại." });
                }
                var dsGheDaDat = await _context.Chitietghe.AsNoTracking()
                                                          .Where(x => x.MaChuyenxe == machuyenxe && x.Trangthai == true)
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
