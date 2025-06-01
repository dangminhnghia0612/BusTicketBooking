using BusTicketBooking_API.Data;
using BusTicketBooking_API.DTOs;
using BusTicketBooking_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text.Json;

namespace BusTicketBooking_API.Controllers
{
    [Authorize(Roles = "1")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoaixeController : ControllerBase
    {
        private readonly QLBanvexeDbContext _context;
        private readonly IConfiguration _configuration;
        public LoaixeController(QLBanvexeDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
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
                                                Nvs = lx.Nhavesinh,
                                                Sodoghe = lx.Sodoghe,
                                                Anh = lx.Anh != null 
                                                      ? $"{_configuration["Domain"]}/images/loaixe/{lx.Anh}" 
                                                      : null
                                            })
                                            .ToListAsync();
                return Ok(dsLoaiXe);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi lấy ds xe.", Error = ex.Message });
            }
        }
        [HttpDelete("{maloaixe}")]
        public async Task<IActionResult> xoaLoaiXe(int maloaixe)
        {
            try
            {
                var loaixe = await _context.Loaixe.FindAsync(maloaixe);
                if (loaixe == null)
                {
                    return NotFound(new { message = "Không tìm thấy loại xe" });
                }
                var xe = await _context.Xe.Where(x => x.MaLoaixe == maloaixe).AnyAsync();
                if (xe)
                {
                    return BadRequest(new { message = "Đã tồn tại xe thuộc loại xe này" });
                }

                var existImg = await _context.Loaixe.AnyAsync(lx => lx.Anh == loaixe.Anh && lx.MaLoaixe != maloaixe);
                if (!existImg && !string.IsNullOrEmpty(loaixe.Anh))
                {
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "loaixe", loaixe.Anh);
                    if (System.IO.File.Exists(filePath))
                    {
                        System.IO.File.Delete(filePath);
                    }
                }

                _context.Loaixe.Remove(loaixe);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Xóa thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Xảy ra lỗi khi xóa xe " + ex.Message });
            }
        }
        [HttpPost]
        public async Task<IActionResult> themLoaiXe([FromForm] LoaixeRequestDTO dto, IFormFile? anh)
        {
            try
            {
                // Kiểm tra dữ liệu đầu vào
                if (dto.Sodoghe == null || dto.Sodoghe.SoTang < 1 || dto.Sodoghe.SoDay < 1 || dto.Sodoghe.SoGheMoiDay == null)
                {
                    return BadRequest(new { message = "Thông tin sơ đồ ghế không hợp lệ" });
                }
                if (dto.Sodoghe.SoGheMoiDay.Count != dto.Sodoghe.SoDay)
                {
                    return BadRequest(new { message = "Số lượng phần tử trong SoGheMoiDay phải bằng số dãy" });
                }

                // Xử lý ảnh
                string? tenFileAnh = null;
                if (anh != null && anh.Length > 0)
                {
                    //C1: Luôn tạo file ảnh mới kể cả khi trùng ảnh
                    // var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "loaixe");
                    // if (!Directory.Exists(folderPath))
                    //     Directory.CreateDirectory(folderPath);

                    // tenFileAnh = Guid.NewGuid().ToString() + Path.GetExtension(anh.FileName);
                    // var filePath = Path.Combine(folderPath, tenFileAnh);

                    // using (var stream = new FileStream(filePath, FileMode.Create))
                    // {
                    //     await anh.CopyToAsync(stream);
                    // }

                    //C2: Nếu trùng ảnh thì không tạo file mới
                    using var ms = new MemoryStream();
                    await anh.CopyToAsync(ms);
                    var bytes = ms.ToArray();
                    using var md5 = MD5.Create();
                    var hash = BitConverter.ToString(md5.ComputeHash(bytes)).Replace("-", "").ToLower();
                    var ext = Path.GetExtension(anh.FileName);
                    tenFileAnh = $"{hash}{ext}";
                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "loaixe");
                    if (!Directory.Exists(folderPath))
                        Directory.CreateDirectory(folderPath);
                    var filePath = Path.Combine(folderPath, tenFileAnh);
                    if (!System.IO.File.Exists(filePath))
                    {
                        await System.IO.File.WriteAllBytesAsync(filePath, bytes);
                    }
                }

                // Tạo sơ đồ ghế dạng JSON
                var danhSachTang = new List<object>();
                for (int tang = 1; tang <= dto.Sodoghe.SoTang; tang++)
                {
                    var cacDay = new List<object>();
                    char kyTuTang = (char)('A' + tang - 1);
                    int so = 0;
                    for (int day = 1; day <= dto.Sodoghe.SoDay; day++)
                    {
                        int soGhe = dto.Sodoghe.SoGheMoiDay[day - 1];
                        var danhSachGhe = new List<string>();
                        if (day < dto.Sodoghe.SoDay)
                        {
                            so = 0;
                            //char kyTuDay = (char)('A' + day - 1);
                            for (int ghe = 0; ghe < soGhe; ghe++)
                            {
                                //int so = (tang % 2 == 1) ? ghe * 2 - 1 : ghe * 2;
                                so = ghe * (dto.Sodoghe.SoDay - 1) + day;
                                danhSachGhe.Add($"{kyTuTang}{so}");
                            }
                            cacDay.Add(new
                            {
                                dayso = day,
                                soghe = danhSachGhe
                            });
                        }
                        else
                        {
                            for (int ghe = 0; ghe < soGhe; ghe++)
                            {
                                so += 1;
                                danhSachGhe.Add($"{kyTuTang}{so}");
                            }
                            cacDay.Add(new
                            {
                                dayso = day,
                                soghe = danhSachGhe
                            });
                        }    
                     
                    }
                    danhSachTang.Add(new
                    {
                        tang = tang,
                        cacday = cacDay
                    });
                }
                var options = new JsonSerializerOptions
                {
                    WriteIndented = true,
                    Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping
                };
                var sodoghe = JsonSerializer.Serialize(danhSachTang, options);

                var loaixe = new Loaixe
                {
                    Tenloai = dto.Tenloai,
                    Soluongghe = dto.Soluongghe.Value,
                    Nhavesinh = dto.Nhavesinh,
                    Sodoghe = sodoghe,
                    Anh = tenFileAnh
                };

                _context.Loaixe.Add(loaixe);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Thêm thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Xảy ra lỗi khi thêm loại xe: " + ex.Message });
            }
        }
        [HttpPut("{maloaixe}")]
        public async Task<IActionResult> suaLoaiXe(int maloaixe, [FromForm] LoaixeRequestDTO dto, IFormFile? anh)
        {
            try
            {
                // Kiểm tra dữ liệu đầu vào
                if (dto.Sodoghe == null || dto.Sodoghe.SoTang < 1 || dto.Sodoghe.SoDay < 1 || dto.Sodoghe.SoGheMoiDay == null)
                {
                    return BadRequest(new { message = "Thông tin sơ đồ ghế không hợp lệ" });
                }
                if (dto.Sodoghe.SoGheMoiDay.Count != dto.Sodoghe.SoDay)
                {
                    return BadRequest(new { message = "Số lượng phần tử trong SoGheMoiDay phải bằng số dãy" });
                }
                var loaixe = await _context.Loaixe.FindAsync(maloaixe);
                if (loaixe == null)
                {
                    return NotFound(new { message = "Không tìm thấy loại xe" });
                }

                // Xử lý ảnh
                string? tenFileAnh = loaixe.Anh;
                if (anh != null && anh.Length > 0)
                {
                    var existImg = await _context.Loaixe.AnyAsync(lx => lx.Anh == loaixe.Anh && lx.MaLoaixe != maloaixe);
                    if (!existImg && !string.IsNullOrEmpty(loaixe.Anh))
                    {
                        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "loaixe", loaixe.Anh);
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
                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "loaixe");
                    if (!Directory.Exists(folderPath))
                        Directory.CreateDirectory(folderPath);
                    var filePathNew = Path.Combine(folderPath, tenFileAnh);
                    if (!System.IO.File.Exists(filePathNew))
                    {
                        await System.IO.File.WriteAllBytesAsync(filePathNew, bytes);
                    }
                }

                loaixe.Tenloai = dto.Tenloai;
                //loaixe.Soluongghe = dto.Soluongghe.Value;
                loaixe.Nhavesinh = dto.Nhavesinh;
                //loaixe.Sodoghe = sodoghe;
                loaixe.Anh = tenFileAnh;


                await _context.SaveChangesAsync();
                return Ok(new { message = "Sửa thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Xảy ra lỗi khi sửa loại xe: " + ex.Message });
            }
        }
    }
}
