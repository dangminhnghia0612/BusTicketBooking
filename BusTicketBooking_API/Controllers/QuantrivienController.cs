using BusTicketBooking_API.Data;
using BusTicketBooking_API.DTOs;
using BusTicketBooking_API.Interfaces;
using BusTicketBooking_API.Models;
using BusTicketBooking_API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BusTicketBooking_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuantrivienController : ControllerBase
    {
        private readonly QLBanvexeDbContext _context;
        public QuantrivienController(QLBanvexeDbContext context, IJwtService jwtService)
        {
            _context = context;
        }
        [HttpPost("Captaikhoan")]
        public async Task<IActionResult> Captaikhoan([FromBody] DangkyDTO dto)
        {
            var admin = await _context.Quantrivien.FirstOrDefaultAsync(ad => ad.Tendangnhap == dto.Tendangnhap || ad.Sodienthoai == dto.Sodienthoai);

            if (admin != null)
            {
                return BadRequest(new { Message = "Tên dăng nhập hoặc số điện thoại đã tồn tại." });
            }
            Quantrivien qtv = new Quantrivien();
            qtv.Tendangnhap = dto.Tendangnhap;
            qtv.Matkhau = BCrypt.Net.BCrypt.HashPassword(dto.Matkhau);
            qtv.Sodienthoai = dto.Sodienthoai;
            qtv.Hoten = "Admin";
            qtv.MaVaitro = 1;
            qtv.Ngaytao = DateTime.Now;
            qtv.Ngaycapnhat = DateTime.Now;
            _context.Quantrivien.Add(qtv);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Cấp tài khoản thành công.",
            });
        }
        [HttpPost("Dangnhap")]
        public async Task<IActionResult> Dangnhap([FromBody] DangnhapDTO dto)
        {
            var admin = await _context.Quantrivien.FirstOrDefaultAsync(ad => ad.Tendangnhap == dto.Tendangnhap);

            if (admin == null)
            {
                return BadRequest(new { message = "Sai tên đăng nhập." });
            }
            if (!BCrypt.Net.BCrypt.Verify(dto.Matkhau, admin.Matkhau))
            {
                return BadRequest(new { message = "Mật khẩu không chính xác." });
            }

            return Ok(new
            {
                message = "Đăng nhập thành công.",
                hoten = admin.Hoten,
                sdt = admin.Sodienthoai,
                ma = admin.MaQuantrivien,
                avatarURL = admin.Anh
            });
        }
    }
}