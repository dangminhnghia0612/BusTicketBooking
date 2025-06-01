using BusTicketBooking_API.Data;
using BusTicketBooking_API.DTOs;
using BusTicketBooking_API.Interfaces;
using BusTicketBooking_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BusTicketBooking_API.Controllers
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

        [HttpPost("dangky")]
        public async Task<IActionResult> DangKy([FromBody] DangkyDTO dto)
        {
            var kh = await _context.Khachhang.FirstOrDefaultAsync(kh => kh.Sodienthoai == dto.Sodienthoai || kh.Email == dto.Email);
            var verificationToken = Guid.NewGuid().ToString();
            var verificationLink = $"{_configuration["Domain"]}/api/Auth/xac-thuc-email?token={verificationToken}";

            string templatePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Templates", "email_verification_template.html");
            string htmlBody = System.IO.File.ReadAllText(templatePath);
            string emailBody = htmlBody
                               .Replace("{{HoTen}}", dto.Hoten)
                               .Replace("{{VerificationLink}}", verificationLink);
            if (kh != null)
            {
                if (kh.MaTrangthai != 1)
                    return BadRequest(new { Message = "Số điện thoại hoặc email đã được sử dụng." });
                else
                {

                    kh.Sodienthoai = dto.Sodienthoai;
                    kh.Matkhau = BCrypt.Net.BCrypt.HashPassword(dto.Matkhau);
                    kh.Email = dto.Email;
                    kh.Hoten = dto.Hoten;
                    kh.Ngaytao = DateTime.Now;
                    kh.Ngaycapnhat = DateTime.Now;
                    kh.Token = verificationToken;
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
                MaTrangthai = 1,
                MaVaitro = 2,
                Anh = "avtDefault.jpg",
                Ngaytao = DateTime.Now,
                Ngaycapnhat = DateTime.Now,
                Token = verificationToken
            };
            _context.Khachhang.Add(khachhang);
            await _context.SaveChangesAsync();
            await _emailService.GuiEmailAsync(dto.Email, "Nhà xe Minh Nghĩa - Xác thực tài khoản đăng ký", emailBody);

            return Ok(new { Message = "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản." });
        }
        [HttpGet("xac-thuc-email")]
        public async Task<IActionResult> XacThucEmail([FromQuery] string token)
        {
            // Tìm khách hàng theo token
            var khachhang = await _context.Khachhang.FirstOrDefaultAsync(kh => kh.Token == token);

            if (khachhang == null)
            {
                return BadRequest(new { Message = "Token không hợp lệ hoặc đã hết hạn." });
            }

            khachhang.MaTrangthai = 2;


            await _context.SaveChangesAsync();

            return Ok(new { Message = "Tài khoản của bạn đã được xác thực thành công." });
        }
        [HttpPost("dangnhap")]
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
            if (khachhang.MaTrangthai != 2)
            {
                return BadRequest(new { Message = "Tài khoản chưa được kích hoạt." });
            }

            // Tạo JWT token
            var token = _jwtService.TaoToken(khachhang);
            khachhang.Dangnhapcuoi = DateTime.Now;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Đăng nhập thành công",
                Token = token,
                TenKH = khachhang.Hoten,
                Sdt = khachhang.Sodienthoai,
                Email = khachhang.Email,
                avatarURL = khachhang.Anh != null
                                ? $"{_configuration["Domain"]}/images/profileUser/{khachhang.Anh}"
                                : null
            });
        }
    }
}
