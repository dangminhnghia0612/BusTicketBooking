using BusTicketBooking_API.Data;
using BusTicketBooking_API.DTOs;
using BusTicketBooking_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace BusTicketBooking_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhachhangController : ControllerBase
    {
        private readonly QLBanvexeDbContext _context;
        private readonly IConfiguration _configuration;
        public KhachhangController(QLBanvexeDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
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

        [Authorize(Roles = "2")]
        [HttpGet("layKhachHang/{maKH}")]
        public async Task<IActionResult> layKhachHang(int maKH)
        {
            try
            {
                var kh = await _context.Khachhang.FindAsync(maKH);
                if (kh == null)
                {
                    return NotFound(new { Message = "Không tìm thấy khách hàng" });
                }
                return Ok(new
                {
                    MaKhachhang = kh.MaKhachhang,
                    Sodienthoai = kh.Sodienthoai,
                    Email = kh.Email,
                    Hoten = kh.Hoten,
                    Gioitinh = kh.Gioitinh,
                    Ngaysinh = kh.Ngaysinh,
                    Diachi = kh.Diachi,
                    Nghenghiep = kh.Nghenghiep,
                    Anh = kh.Anh != null
                                ? $"{_configuration["Domain"]}/images/profileUser/{kh.Anh}"
                                : null

                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi lấy thông tin khách hàng.", Error = ex.Message });
            }
        }

        [Authorize(Roles = "2")]
        [HttpPut("suaThongTin/{maKH}")]
        public async Task<IActionResult> suaThongTin(int maKH, [FromForm] KhachhangRequestDTO dto, IFormFile? anh)
        {
            try
            {
                var kh = await _context.Khachhang.FindAsync(maKH);
                if (kh == null)
                {
                    return NotFound(new { Message = "Không tìm thấy khách hàng" });
                }
                string? tenFileAnh = kh.Anh;
                if (anh != null && anh.Length > 0)
                {
                    var existImg = await _context.Khachhang.AnyAsync(t => t.Anh == kh.Anh && t.MaKhachhang != maKH);
                    if (!existImg && !string.IsNullOrEmpty(kh.Anh))
                    {
                        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "profileUser", kh.Anh);
                        if (System.IO.File.Exists(filePath))
                        {
                            System.IO.File.Delete(filePath);
                        }
                    }

                    using var ms = new MemoryStream();
                    await anh.CopyToAsync(ms);
                    var bytes = ms.ToArray();
                    using var md5 = MD5.Create();
                    var hash = BitConverter.ToString(md5.ComputeHash(bytes)).Replace("-", "").ToLower();
                    var ext = Path.GetExtension(anh.FileName);
                    tenFileAnh = $"{hash}{ext}";
                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "profileUser");
                    if (!Directory.Exists(folderPath))
                        Directory.CreateDirectory(folderPath);
                    var filePathNew = Path.Combine(folderPath, tenFileAnh);
                    if (!System.IO.File.Exists(filePathNew))
                    {
                        await System.IO.File.WriteAllBytesAsync(filePathNew, bytes);
                    }
                }

                kh.Hoten = dto.Hoten;
                kh.Sodienthoai = dto.Sodienthoai;
                kh.Gioitinh = dto.Gioitinh;
                kh.Ngaysinh = dto.Ngaysinh ?? kh.Ngaysinh;
                kh.Diachi = dto.Diachi;
                kh.Nghenghiep = dto.Nghenghiep;
                kh.Anh = tenFileAnh;
                kh.Ngaycapnhat = DateTime.Now;

                await _context.SaveChangesAsync();
                return Ok(new { Message = "Cập nhật thành công." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi cập nhật thông tin khách hàng: " +  ex.Message });
            }
        }

        [Authorize(Roles = "2")]
        [HttpPut("doi-mat-khau/{maKH}")]
        public async Task<IActionResult> doiMatKhau(int maKH, [FromBody] KhachhangRequestDTO dto)
        {

            try
            {
                var kh = await _context.Khachhang.FindAsync(maKH);
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
        [Authorize(Roles = "2")]
        [HttpGet("lich-su-mua-ve/{maKH}")]
        public async Task<IActionResult> layLichSuMuaVe(int maKH)
        {
            try
            {
                var khachhang = await _context.Khachhang.AnyAsync(kh => kh.MaKhachhang == maKH);
                if (!khachhang)
                {
                    return BadRequest(new { Message = "Khách hàng không tồn tại" });
                }
                var dsDatVe = await _context.Datve.AsNoTracking()
                                            .Where(x => x.MaKhachhang == maKH)
                                            .Select(x => new
                                            {
                                                Madatve = x.MaDatve,
                                                Soluong = x.Soluong,
                                                Bendi = x.MaChuyenxeNavigation.MaTuyenxeNavigation.Lotrinh.Where(lt => lt.Labendau == true)
                                                                                                          .Select(lt => lt.MaBenxeNavigation.Tenbenxe)
                                                                                                          .FirstOrDefault(),
                                                Benden = x.MaChuyenxeNavigation.MaTuyenxeNavigation.Lotrinh.Where(lt => lt.Labencuoi == true)
                                                                                                           .Select(lt => lt.MaBenxeNavigation.Tenbenxe)
                                                                                                           .FirstOrDefault(),
                                                Ngaydi = x.MaChuyenxeNavigation.Giodi,
                                                Sotien = x.Giasaukhuyenmai,
                                                Pttt = x.Lichsuthanhtoan.Where(tt => tt.MaDatve == x.MaDatve).Select(tt => tt.MaPhuongthucNavigation.Ten).FirstOrDefault(),
                                                Trangthai = x.MaTinhtrangNavigation.Ten,
                                            })
                                            .ToListAsync();
                return Ok(dsDatVe);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi lấy ds đặt vé.", Error = ex.Message });
            }
        }
    }
}
