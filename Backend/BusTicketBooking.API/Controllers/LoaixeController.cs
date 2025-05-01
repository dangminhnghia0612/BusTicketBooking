using BusTicketBooking.API.Data;
using BusTicketBooking.API.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BusTicketBooking.API.Controllers
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
        [HttpPost(("laySoDoGhe"))]
        public async Task<IActionResult> getSodoghefromMaChuyenxe([FromBody] int machuyenxe)
        {
            try
            {
                var sodo = await _context.Chuyenxe.Where(cx => cx.MaChuyenxe == machuyenxe)
                                            .Select(cx => cx.MaXeNavigation.MaLoaixeNavigation.Sodoghe)
                                            .FirstOrDefaultAsync();
                if (sodo == null)
                    return NotFound("Không tìm thấy sơ đồ ghế cho chuyến xe này");
                var chuanHoa = sodo.Replace("\r", "").Replace("\n", "").Replace("\t", "");
                return Ok(new { sodoghe = chuanHoa });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi tìm sơ đồ.", Error = ex.Message });
            }
        }
    }
}
