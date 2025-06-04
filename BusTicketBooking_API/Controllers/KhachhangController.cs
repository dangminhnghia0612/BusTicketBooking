using BusTicketBooking_API.Data;
using BusTicketBooking_API.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BusTicketBooking_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhachhangController : ControllerBase
    {
        private readonly QLBanvexeDbContext _context;
        public KhachhangController(QLBanvexeDbContext context)
        {
            _context = context;
        }
        [HttpPost(("TimKhachHang"))]
        public async Task<IActionResult> timKhachhang([FromBody] KhachhangRequestDTO dto)
        {
            try
            {
                var kh = await _context.Khachhang.Where(x => x.Sodienthoai == dto.Sodienthoai || x.Email == dto.Email)
                                                 .FirstOrDefaultAsync();
                if (kh == null)
                {
                    return NotFound(new { Message = "Không tìm thấy khách hàng" });
                }
                return Ok(kh.MaKhachhang);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi tìm khách hàng.", Error = ex.Message });
            }
        }
    }
}
