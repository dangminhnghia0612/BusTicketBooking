using BusTicketBooking.API.Data;
using BusTicketBooking.API.Models;
using BusTicketBooking.API.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BusTicketBooking.API.Interfaces;
using BusTicketBooking.API.Services;
using Microsoft.AspNetCore.Authorization;

namespace BusTicketBooking.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly QLBanvexeDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        private readonly IJwtService _jwtService;

        public AuthController(QLBanvexeDbContext context, IConfiguration configuration, IEmailService emailService, IJwtService jwtService)
        {
            _context = context;
            _configuration = configuration;
            _emailService = emailService;
            _jwtService = jwtService;

        }
        [HttpPost("Dangky")]
        public async Task<IActionResult> Dangky([FromBody] DangkyDTO dto)
        {
            var kh = await _context.Khachhang.FirstOrDefaultAsync(kh => kh.Sodienthoai == dto.Sodienthoai || kh.Email == dto.Email );

            var verificationToken = Guid.NewGuid().ToString();
            var verificationLink = $"https://localhost:7054/api/Auth/XacThucEmail?token={verificationToken}";
            var emailBody = $"Xin chào {dto.Hoten},<br><br>Vui lòng nhấn vào liên kết sau để xác thực tài khoản của bạn:<br><a href='{verificationLink}'>Xác thực tài khoản</a>";

            if (kh != null)
            {
                if(kh.MaTinhtrang != 1)
                    return BadRequest(new { Message = "Số điện thoại hoặc email đã được sử dụng." });
                else
                {
                    kh.Sodienthoai = dto.Sodienthoai;
                    kh.Matkhau = BCrypt.Net.BCrypt.HashPassword(dto.Matkhau);
                    kh.Email = dto.Email;
                    kh.Hoten = dto.Hoten;
                    kh.Ngaytao = DateTime.Now;
                    kh.Ngaycapnhat = DateTime.Now;
                    kh.Ghichu = verificationToken;
                    await _context.SaveChangesAsync();
                    await _emailService.GuiEmailAsync(dto.Email, "Nhà xe Minh Nghĩa - Xác thực tài khoản đăng ký", emailBody);
                    return Ok(new { Message = "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản." });
                }    
            }
            var khachhang = new Khachhang
            {
                Sodienthoai = dto.Sodienthoai,
                Matkhau = BCrypt.Net.BCrypt.HashPassword(dto.Matkhau),
                Email = dto.Email,
                Hoten = dto.Hoten,
                MaTinhtrang = 1, 
                MaVaitro = 2, 
                Ngaytao = DateTime.Now,
                Ngaycapnhat = DateTime.Now,
                Ghichu = verificationToken
            };
            _context.Khachhang.Add(khachhang);
            await _context.SaveChangesAsync();
            await _emailService.GuiEmailAsync(dto.Email, "Nhà xe Minh Nghĩa - Xác thực tài khoản đăng ký", emailBody);

            return Ok(new { Message = "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản." });
        }
        [HttpGet("XacThucEmail")]
        public async Task<IActionResult> XacThucEmail([FromQuery] string token)
        {
            // Tìm khách hàng theo token
            var khachhang = await _context.Khachhang.FirstOrDefaultAsync(kh => kh.Ghichu == token);

            if (khachhang == null)
            {
                return BadRequest(new { Message = "Token không hợp lệ hoặc đã hết hạn." });
            }

            khachhang.MaTinhtrang = 2;
            khachhang.Ghichu = null;

            await _context.SaveChangesAsync();

            return Ok(new { Message = "Tài khoản của bạn đã được xác thực thành công." });
        }
        [HttpPost("Dangnhap")]
        public async Task<IActionResult> Dangnhap([FromBody] DangnhapDTO dto)
        {
            var khachhang = await _context.Khachhang.FirstOrDefaultAsync(kh => kh.Email == dto.Tendangnhap || kh.Sodienthoai == dto.Tendangnhap);

            if (khachhang == null)
            {
                return BadRequest(new { Message = "Email hoặc số điện thoại không tồn tại." });
            }
            if (!BCrypt.Net.BCrypt.Verify(dto.Matkhau, khachhang.Matkhau))
            {
                return BadRequest(new { Message = "Mật khẩu không chính xác." });
            }
            if (khachhang.MaTinhtrang != 2)
            {
                return BadRequest(new { Message = "Tài khoản chưa được kích hoạt." });
            }

            // Tạo JWT token
            var token = _jwtService.TaoToken(khachhang);

            return Ok(new
            {
                Message = "Đăng nhập thành công.",
                Token = token,
                TenKH = khachhang.Hoten
            });
        }
    }
}
