using BusTicketBooking.API.Data;
using BusTicketBooking.API.DTOs;
using BusTicketBooking.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BusTicketBooking.API.Controllers
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
                var kh = await _context.Khachhang.Where(x => x.Sodienthoai == dto.Sodienthoai && x.Email == dto.Email)
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
        [HttpGet(("tim-khach-hang/{maKH}"))]
        public async Task<IActionResult> timKhachhangBangMa(int maKH)
        {
            try
            {
                var kh = await _context.Khachhang.FirstOrDefaultAsync(x => x.MaKhachhang == maKH);
                if (kh == null)
                {
                    return NotFound(new { Message = "Không tìm thấy khách hàng" });
                }
                return Ok(kh);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi tìm khách hàng.", Error = ex.Message });
            }
        }
        [HttpPut("sua-thong-tin/{maKH}")]
        public async Task<IActionResult> suaKhachHang(int maKH, [FromBody] KhachhangRequestDTO dto)
        {
            try
            {
                var kh = await _context.Khachhang.FirstOrDefaultAsync(x => x.MaKhachhang == maKH);
                if (kh == null)
                {
                    return NotFound(new { Message = "Không tìm thấy khách hàng" });
                }
                var existKH = await _context.Khachhang.AnyAsync(x => (x.Sodienthoai == dto.Sodienthoai || x.Email == dto.Email) && x.MaKhachhang != maKH);
                if (existKH)
                {
                    return BadRequest(new { Message = "Số điện thoại hoặc email đã tồn tại" });
                }
                // Cập nhật thông tin
                if (dto.Hoten != null) kh.Hoten = dto.Hoten;
                if (dto.Sodienthoai != null) kh.Sodienthoai = dto.Sodienthoai;
                if (dto.Email != null) kh.Email = dto.Email;
                if (dto.Diachi != null) kh.Diachi = dto.Diachi;
                if (dto.Nghenghiep != null) kh.Nghenghiep = dto.Nghenghiep;
                if (dto.Ngaysinh != null) kh.Ngaysinh = dto.Ngaysinh;
                if (dto.Gioitinh != null) kh.Gioitinh = dto.Gioitinh;
                // Thêm các trường khác nếu cần

                await _context.SaveChangesAsync();
                return Ok(new { Message = "Cập nhật thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi cập nhật khách hàng vì " +  ex.Message });
            }
        }
        [HttpPut("doi-mat-khau/{maKH}")]
        public async Task<IActionResult> doiMatKhau(int maKH, [FromBody] KhachhangRequestDTO dto)
        {
            try
            {
                var kh = await _context.Khachhang.FirstOrDefaultAsync(x => x.MaKhachhang == maKH);
                if (kh == null)
                {
                    return NotFound(new { Message = "Không tìm thấy khách hàng" });
                }
                if (!BCrypt.Net.BCrypt.Verify(dto.Matkhaucu, kh.Matkhau))
                {
                    return BadRequest(new { Message = "Mật khẩu cũ không chính xác." });
                }
                if (dto.Matkhaumoi != null) kh.Matkhau = BCrypt.Net.BCrypt.HashPassword(dto.Matkhaumoi);

                await _context.SaveChangesAsync();
                return Ok(new { Message = "Cập nhật thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi cập nhật mật khẩu vì " + ex.Message });
            }
        }
    }
}
