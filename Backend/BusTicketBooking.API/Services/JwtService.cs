using BusTicketBooking.API.Interfaces;
using BusTicketBooking.API.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BusTicketBooking.API.Services
{
    public class JwtService : IJwtService
    {
        private readonly IConfiguration _configuration;
        public JwtService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string TaoToken(Khachhang khachhang)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, khachhang.MaKhachhang.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("Email", khachhang.Email.ToString()),
                new Claim("Sodienthoai", khachhang.Sodienthoai.ToString()),
                new Claim("Hoten", khachhang.Hoten ?? ""),
                new Claim("MaVaitro", khachhang.MaVaitro.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(3),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
