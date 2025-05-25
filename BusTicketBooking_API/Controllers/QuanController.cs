using BusTicketBooking_API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BusTicketBooking_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuanController : ControllerBase
    {
        private readonly QLBanvexeDbContext _context;

        public QuanController(QLBanvexeDbContext context)
        {
            _context = context;
        }
        [HttpGet("lay-ds-quan-cua-tinh/{maTinh}")]
        public async Task<IActionResult> layDSQuanCuaTinh(int maTinh)
        {
            try
            {
                var existTinh = await _context.Tinh.AnyAsync(t => t.MaTinh == maTinh);
                if (!existTinh)
                {
                    return NotFound(new { Message = "Không tìm thấy tỉnh này." });
                }
                var ds = await _context.Quan.AsNoTracking()
                    .Where(q => q.MaTinh == maTinh)
                    .Select(q => new
                    {
                        Maquan = q.MaQuan,
                        Tenquan = q.Ten,
                    })
                    .ToListAsync();
                return Ok(ds);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Đã xảy ra lỗi khi lấy danh sách quận: " + ex.Message });
            }
        }
    }
}
