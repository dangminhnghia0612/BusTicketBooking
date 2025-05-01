using BusTicketBooking.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BusTicketBooking.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GheController : ControllerBase
    {
        private readonly QLBanvexeDbContext _context;
        public GheController(QLBanvexeDbContext context)
        {
            _context = context;
        }
        [HttpPost(("layDSGheDaDat"))]
        public async Task<IActionResult> layDSGheDaDat([FromBody] int machuyenxe)
        {
            try
            {
                var chuyenxe = await _context.Chuyenxe.FindAsync(machuyenxe);
                if (chuyenxe == null)
                {
                    return NotFound("Không tìm thấy chuyến xe");
                }
                var dsGheDaDat = await _context.Ghe.Where(g => g.MaXe == chuyenxe.MaXe && g.Trangthai == true)
                                                   .Select(g => g.Soghe).ToListAsync();
                return Ok(dsGheDaDat);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi lấy ds ghế.", Error = ex.Message });
            }
        }
    }
}
