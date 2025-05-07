using BusTicketBooking.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
                var dsGheDaDat = await _context.Chitietghe.Where(x => x.MaChuyenxe == machuyenxe && x.Trangthai == true)
                                                          .Include(x => x.MaGheNavigation)
                                                          .Select(x => x.MaGheNavigation.Soghe)
                                                          .ToListAsync();
                return Ok(dsGheDaDat);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi lấy ds ghế.", Error = ex.Message });
            }
        }
    }
}
