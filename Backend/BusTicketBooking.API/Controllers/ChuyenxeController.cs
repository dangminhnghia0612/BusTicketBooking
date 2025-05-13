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
    public class ChuyenxeController : ControllerBase
    {
        private readonly QLBanvexeDbContext _context;
        public ChuyenxeController (QLBanvexeDbContext context)
        {
            _context = context;
        }
        [HttpPost("TimChuyenXe")]
        public async Task<IActionResult> TimChuyenxe([FromBody] ChuyenxeRequestDTO dto)
        {
            try
            {
                //var ds = await _context.ChuyenxeResponseDTO.FromSqlInterpolated(
                //   $@"EXEC sp_TimChuyenXe @TinhDi = {dto.Diemdi}, @TinhDen = {dto.Diemden}, @NgayDi = {dto.Ngaydi}, @Soluongve = {dto.Soluongve}").ToListAsync();
                var ds = await _context.Database.SqlQuery<ChuyenxeResponseDTO>
                    ($@"EXEC sp_TimChuyenXe @TinhDi = {dto.Diemdi}, @TinhDen = {dto.Diemden}, @NgayDi = {dto.Ngaydi}, @Soluongve = {dto.Soluongve}")
                .ToListAsync();
                return Ok(ds);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi tìm chuyến xe.", Error = ex.Message });
            }
        }
        [HttpGet]
        public async Task<IActionResult> layDSChuyenXe()
        {
            try
            {
                var ds = await _context.Chuyenxe.AsNoTracking()
                                           .Select(cx => new
                                           {
                                               Machuyenxe = cx.MaChuyenxe,
                                               Diemdi = cx.MaTuyenxeNavigation.MaDiemdiNavigation.MaQuanNavigation.MaTinhNavigation.Ten,
                                               Diemden = cx.MaTuyenxeNavigation.MaDiemdenNavigation.MaQuanNavigation.MaTinhNavigation.Ten,
                                               Matuyenxe = cx.MaChuyenxe,
                                               Bendi = cx.MaTuyenxeNavigation.MaDiemdiNavigation.Tenbenxe,
                                               Benden = cx.MaTuyenxeNavigation.MaDiemdenNavigation.Tenbenxe,
                                               Biensoxe = cx.MaXeNavigation.Bienso,
                                               Giodi = cx.Giodi,
                                               Gioden = cx.Gioden
                                           })
                                           .OrderByDescending(cx => cx.Giodi).ThenBy(cx => cx.Matuyenxe)
                                           .ToListAsync();
                return Ok(ds);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi lấy ds chuyến xe.", Error = ex.Message });
            }
        }
        [HttpDelete("{machuyenxe}")]
        public async Task<IActionResult> xoaXe(int machuyenxe)
        {
            try
            {
                var chuyenxe = await _context.Chuyenxe.Include(cx => cx.Chitietghe).FirstOrDefaultAsync(cx => cx.MaChuyenxe == machuyenxe);
                if (chuyenxe == null)
                {
                    return NotFound(new { message = "Không tìm thấy chuyến xe" });
                }
                var datve = await _context.Datve.Where(dv => dv.MaChuyenxe == machuyenxe).AnyAsync();
                if (datve)
                {
                    return BadRequest(new { message = "Chuyến xe này đã có vé đặt" });
                }
                if (chuyenxe.Chitietghe != null && chuyenxe.Chitietghe.Any())
                {
                    _context.Chitietghe.RemoveRange(chuyenxe.Chitietghe);
                }

                _context.Chuyenxe.Remove(chuyenxe);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Xóa thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Xảy ra lỗi khi xóa chuyến xe " + ex.Message });
            }
        }
        [HttpPost("ThemChuyenXe")]
        public async Task<IActionResult> themChuyenXe([FromBody] ChuyenxeRequestDTO dto)
        {
            try
            {
                var tx = await _context.Tuyenxe.FindAsync(dto.MaTuyenxe);
                if (tx == null)
                {
                    return NotFound(new { message = "Không tìm thấy tuyến xe " });
                }
                var xe = await _context.Xe.AnyAsync(x => x.MaXe == dto.MaXe);
                if (!xe)
                {
                    return NotFound(new { message = "Không tìm thấy xe " });
                }
                var gioden = dto.Giodi.Value.AddHours(tx.Khoangthoigian.Value);

                var existXeDaSuDung = await _context.Chuyenxe.AnyAsync(cx => cx.MaXe == dto.MaXe && (dto.Giodi <= cx.Gioden && gioden >= cx.Giodi));
                if (existXeDaSuDung)
                {
                    return BadRequest(new { message = "Xe này đã có chuyến trong khoảng thời gian này." });
                }
                var cx = new Chuyenxe
                {
                    MaTuyenxe = dto.MaTuyenxe.Value,
                    MaXe = dto.MaXe.Value,
                    Giodi = dto.Giodi.Value,
                    Gioden = gioden
                };
                _context.Chuyenxe.Add(cx);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Thêm thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Xảy ra lỗi khi thêm tuyến xe " + ex.Message });
            }
        }
        [HttpPut("{machuyenxe}")]
        public async Task<IActionResult> suaChuyenXe(int machuyenxe, [FromBody] ChuyenxeRequestDTO dto)
        {
            try
            {
                var coVeDaDat = await _context.Datve.AnyAsync(d => d.MaChuyenxe == machuyenxe);
                if (coVeDaDat)
                {
                    return BadRequest(new { message = "Không thể thay đổi thông tin khi đã có vé đặt" });
                }
                var chuyenXe = await _context.Chuyenxe.FirstOrDefaultAsync(c => c.MaChuyenxe == machuyenxe);
                if (chuyenXe == null)
                {
                    return NotFound(new { message = "Không tìm thấy chuyến xe" });
                }
                var tx = await _context.Tuyenxe.FindAsync(dto.MaTuyenxe);
                if (tx == null)
                {
                    return NotFound("Không tìm thấy tuyến xe");
                }
                var xe = await _context.Xe.AnyAsync(x => x.MaXe == dto.MaXe);
                if (!xe)
                {
                    return NotFound(new { message = "Không tìm thấy xe " });
                }
                var gioDenMoi = dto.Giodi.Value.AddHours(tx.Khoangthoigian.Value);
                var xeDaSuDung = await _context.Chuyenxe.AnyAsync(c => c.MaXe == dto.MaXe
                                                                   && c.MaChuyenxe != machuyenxe
                                                                   && dto.Giodi <= c.Gioden
                                                                   && gioDenMoi >= c.Giodi);
                if (xeDaSuDung)
                {
                    return BadRequest(new { message = "Xe này đã có chuyến trong khoảng thời gian này." });
                }
                chuyenXe.MaTuyenxe = dto.MaTuyenxe.Value;
                chuyenXe.MaXe = dto.MaXe.Value;
                chuyenXe.Giodi = dto.Giodi.Value;
                chuyenXe.Gioden = gioDenMoi;

                await _context.SaveChangesAsync();
                return Ok(new { message = "Sửa thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Xảy ra lỗi khi sửa chuyến xe " + ex.Message });
            }
        }
        [HttpGet("tim-chuyen-xe/{maChuyen}")]
        public async Task<IActionResult> timTuyenXe(int maChuyen)
        {
            try
            {
                var chuyenxe = await _context.Chuyenxe.AsNoTracking()
                    .Where(cx => cx.MaChuyenxe == maChuyen)
                    .Select(cx => new
                    {
                        Diemdi = cx.MaTuyenxeNavigation.MaDiemdiNavigation.MaQuanNavigation.MaTinh,
                        Diemden = cx.MaTuyenxeNavigation.MaDiemdenNavigation.MaQuanNavigation.MaTinh,
                        Matuyenxe = cx.MaTuyenxe,
                        Bendi = cx.MaTuyenxeNavigation.MaDiemdiNavigation.Tenbenxe,
                        Benden = cx.MaTuyenxeNavigation.MaDiemdenNavigation.Tenbenxe,
                        Maxe = cx.MaXe,
                        Bienso = cx.MaXeNavigation.Bienso,
                        Giodi = cx.Giodi,
                    })
                    .FirstOrDefaultAsync();
                if (chuyenxe == null)
                {
                    return NotFound(new { message = "Không tìm thấy tuyến xe" });
                }
                return Ok(chuyenxe);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi tìm chuyến xe.", Error = ex.Message });
            }
        }
    }
}
