using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BusTicketBooking.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhachhangController : ControllerBase
    {
        [Authorize]
        [HttpGet("LayThongTinKhachHang")]
        public IActionResult LayThongTinKhachHang()
        {
            // Lấy thông tin từ token
            var maKhachhang = User.Claims.FirstOrDefault(c => c.Type == "MaKhachhang")?.Value;

            if (maKhachhang == null)
            {
                return BadRequest("Không tìm thấy mã khách hàng trong token.");
            }

            return Ok(new
            {
                MaKhachhang = maKhachhang
            });
        }
    }
}
