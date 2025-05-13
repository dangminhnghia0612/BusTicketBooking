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
    public class TuyenxeController : ControllerBase
    {
        private readonly QLBanvexeDbContext _context;
        public TuyenxeController(QLBanvexeDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> layDSTuyenXe()
        {
            try
            {
                var dsTuyenXe = await _context.Tuyenxe.AsNoTracking()
                    .Select(t => new
                    {
                        Matuyen = t.MaTuyenxe,
                        Tinhdi = t.MaDiemdiNavigation.MaQuanNavigation.MaTinhNavigation.Ten,
                        Tinhden = t.MaDiemdenNavigation.MaQuanNavigation.MaTinhNavigation.Ten,
                        Bendi = t.MaDiemdiNavigation.Tenbenxe,
                        Benden = t.MaDiemdenNavigation.Tenbenxe,
                        Khoangthoigian = t.Khoangthoigian,
                        Khoangcach = t.Khoangcach,
                        Giave = t.Giave,
                    })
                    .ToListAsync();
                return Ok(dsTuyenXe);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi lấy danh sách tuyến xe.", Error = ex.Message });
            }
        }
        [HttpGet("tim-tuyen-xe/{maTuyen}")]
        public async Task<IActionResult> timTuyenXe(int maTuyen)
        {
            try
            {
                var tuyenxe = await _context.Tuyenxe.AsNoTracking()
                    .Where(t => t.MaTuyenxe == maTuyen)
                    .Select(t => new
                    {
                        Matuyen = t.MaTuyenxe,
                        Tinhdi = t.MaDiemdiNavigation.MaQuanNavigation.MaTinhNavigation.Ten,
                        Tinhden = t.MaDiemdenNavigation.MaQuanNavigation.MaTinhNavigation.Ten,
                        Bendi = t.MaDiemdiNavigation.Tenbenxe,
                        Benden = t.MaDiemdenNavigation.Tenbenxe,
                        Khoangthoigian = t.Khoangthoigian,
                        Khoangcach = t.Khoangcach,
                        Giave = t.Giave,
                    })
                    .FirstOrDefaultAsync();
                if (tuyenxe == null)
                {
                    return NotFound(new { message = "Không tìm thấy tuyến xe" });
                }
                return Ok(tuyenxe);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi tìm tuyến xe.", Error = ex.Message });
            }
        }
        [HttpGet("tim-tuyen-xe")]
        public async Task<IActionResult> timTuyenXeBangMaTinh([FromQuery] int maTinhDi, [FromQuery] int maTinhden)
        {
            try
            {
                var dsTuyenxe = await _context.Tuyenxe.AsNoTracking()
                    .Where(t => t.MaDiemdiNavigation.MaQuanNavigation.MaTinh == maTinhDi && t.MaDiemdenNavigation.MaQuanNavigation.MaTinh == maTinhden)
                    .Select(t => new
                    {
                        Matuyen = t.MaTuyenxe,
                        Bendi = t.MaDiemdiNavigation.Tenbenxe,
                        Benden = t.MaDiemdenNavigation.Tenbenxe
                    })
                    .ToListAsync();
                if (dsTuyenxe.Count == 0)
                {
                    return NotFound(new { message = "Không tìm thấy tuyến xe nào" });
                }
                return Ok(dsTuyenxe);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi tìm tuyến xe.", Error = ex.Message });
            }
        }
        [HttpDelete("{matuyenxe}")]
        public async Task<IActionResult> xoaXe(int matuyenxe)
        {
            try
            {
                var tuyenxe = await _context.Tuyenxe.FindAsync(matuyenxe);
                if (tuyenxe == null)
                {
                    return NotFound(new { message = "Không tìm thấy tuyến xe" });
                }
                var chuyenxe = await _context.Chuyenxe.Where(cx => cx.MaTuyenxe == matuyenxe).AnyAsync();
                if (chuyenxe)
                {
                    return BadRequest(new { message = "Đã có chuyến xe thuộc tuyến xe này" });
                }
                _context.Tuyenxe.Remove(tuyenxe);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Xóa thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Xảy ra lỗi khi xóa tuyến xe " + ex.Message });
            }
        }
        [HttpPost("ThemTuyenXe")]
        public async Task<IActionResult> themTuyenXe([FromBody] TuyenxeResquestDTO dto)
        {
            try
            {
                var existTuyen = await _context.Tuyenxe.AnyAsync(tx => tx.MaDiemdi == dto.MaDiemdi && tx.MaDiemden == dto.MaDiemden);
                if (existTuyen)
                {
                    return BadRequest(new { message = "Tuyến xe đã tồn tại" });
                }
                var tx = new Tuyenxe
                {
                    MaDiemdi = dto.MaDiemdi,
                    MaDiemden = dto.MaDiemden,
                    Khoangcach = dto.Khoangcach,
                    Khoangthoigian = dto.Khoangthoigian,
                    Giave = dto.Giave
                };
                _context.Tuyenxe.Add(tx);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Thêm thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Xảy ra lỗi khi thêm tuyến xe " + ex.Message });
            }
        }
        [HttpPut("{matuyenxe}")]
        public async Task<IActionResult> suaTuyenXe(int matuyenxe, [FromBody] TuyenxeResquestDTO dto)
        {
            try
            {
                var tuyenxe = await _context.Tuyenxe.FindAsync(matuyenxe);
                if (tuyenxe == null)
                {
                    return NotFound(new { message = "Tuyến xe không tồn tại." });
                }
                var existTuyen = await _context.Tuyenxe.AnyAsync(tx => tx.MaDiemdi == dto.MaDiemdi && tx.MaDiemden == dto.MaDiemden && tx.MaTuyenxe != matuyenxe);
                if (existTuyen)
                {
                    return BadRequest(new { message = "Tuyến xe đã tồn tại" });
                }
                tuyenxe.MaDiemdi = dto.MaDiemdi;
                tuyenxe.MaDiemden = dto.MaDiemden;
                tuyenxe.Khoangcach = dto.Khoangcach;
                tuyenxe.Khoangthoigian = dto.Khoangthoigian;
                tuyenxe.Giave = dto.Giave;

                await _context.SaveChangesAsync();
                return Ok(new { message = "Sửa thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Xảy ra lỗi khi sửa tuyến xe " + ex.Message });
            }
        }
    }
}
