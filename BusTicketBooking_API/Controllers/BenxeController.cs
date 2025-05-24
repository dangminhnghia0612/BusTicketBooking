using BusTicketBooking_API.Data;
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
        public async Task<IActionResult> layDSQuanCuaTinh(int maTinh)
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
    }
}
