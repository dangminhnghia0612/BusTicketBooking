using BusTicketBooking_API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BusTicketBooking_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TinhController : ControllerBase
    {
        private readonly QLBanvexeDbContext _context;
        public TinhController(QLBanvexeDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var ds = await _context.Tinh.AsNoTracking()
                    .Select(t => new
                    {
                        t.MaTinh,
                        t.Code,
                        t.Ten
                    })
                    .ToListAsync();

                return Ok(ds);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Đã xảy ra lỗi khi lấy danh sách tỉnh.", Error = ex.Message });
            }
        }
    }
}
