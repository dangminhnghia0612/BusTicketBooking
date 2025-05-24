using BusTicketBooking_API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BusTicketBooking_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoaixeController : ControllerBase
    {
        private readonly QLBanvexeDbContext _context;
        public LoaixeController(QLBanvexeDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> layDSLoaiXe()
        {
            try
            {

                var dsLoaiXe = await _context.Loaixe.AsNoTracking()
                                            .Select(lx => new
                                            {
                                                Maloaixe = lx.MaLoaixe,
                                                Tenloai = lx.Tenloai,
                                                Soluongghe = lx.Soluongghe,
                                                nvs = lx.Nhavesinh
                                            })
                                            .ToListAsync();
                return Ok(dsLoaiXe);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi lấy ds xe.", Error = ex.Message });
            }
        }
    }
}
