using BusTicketBooking_API.Data;
using BusTicketBooking_API.DTOs;
using BusTicketBooking_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BusTicketBooking_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChuyenxeController : ControllerBase
    {
        private readonly QLBanvexeDbContext _context;

        public ChuyenxeController(QLBanvexeDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> layDSChuyenXe()
        {
            try
            {
                
                var dsChuyenXe = await _context.Chuyenxe.Include(cx => cx.MaXeNavigation).AsNoTracking().ToListAsync();
                List<ChuyenxeReponseDTO> dsChuyenXeResponse = new List<ChuyenxeReponseDTO>();
                foreach (var cx in dsChuyenXe)
                {
                    ChuyenxeReponseDTO chuyenXeResponse = new ChuyenxeReponseDTO
                    {
                        MaChuyenxe = cx.MaChuyenxe,
                        MaTuyenxe = cx.MaTuyenxe,
                        MaXe = cx.MaXe,
                        Bienso = cx.MaXeNavigation.Bienso,
                        Giodi = cx.Giodi.Value,
                        Gioden = cx.Gioden.Value,
                        LoTrinh = await _context.TuyenxeView
                                                .Where(tx => tx.MaTuyenxe == cx.MaTuyenxe)
                                                .OrderBy(tx => tx.Thutu)
                                                .Select(tx => new LotrinhItemDTO
                                                {
                                                    Thutu = tx.Thutu,
                                                    MaTinh = tx.MaTinh,
                                                    MaBenxe = tx.MaBenxe,
                                                    TenBenXe = tx.Tenbenxe,
                                                    TenTinh = tx.Tentinh
                                                })
                                                .ToListAsync()
                    };
                    dsChuyenXeResponse.Add(chuyenXeResponse);
                }    
                return Ok(dsChuyenXeResponse);

            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi lấy ds chuyến xe.", Error = ex.Message });
            }
        }
        [HttpDelete("{machuyenxe}")]
        public async Task<IActionResult> xoaChuyenXe(int machuyenxe)
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

                var maBenXeBanDau = await _context.TuyenxeView
                                            .Where(txv => txv.MaTuyenxe == chuyenxe.MaTuyenxe)
                                            .OrderBy(txv => txv.Thutu)
                                            .Select(txv => txv.MaBenxe)
                                            .FirstOrDefaultAsync();
                var xe = await _context.Xe.FindAsync(chuyenxe.MaXe);
                xe.MaBenxe = maBenXeBanDau;

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
        [HttpPost]
        public async Task<IActionResult> themChuyenXe([FromBody] ChuyenxeRequestDTO dto)
        {
            try
            {
                var tx = await _context.Tuyenxe.FindAsync(dto.MaTuyenxe);
                if (tx == null)
                {
                    return NotFound(new { message = "Không tìm thấy tuyến xe " });
                }
                var xe = await _context.Xe.FindAsync(dto.MaXe);
                if (xe == null)
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
                    MaTuyenxe = dto.MaTuyenxe,
                    MaXe = dto.MaXe,
                    Giodi = dto.Giodi.Value,
                    Gioden = gioden
                };

                var maBenXeDen = await _context.TuyenxeView
                            .Where(txv => txv.MaTuyenxe == dto.MaTuyenxe)
                            .OrderByDescending(txv => txv.Thutu)
                            .Select(txv => txv.MaBenxe)
                            .FirstOrDefaultAsync();
                xe.MaBenxe = maBenXeDen;

                _context.Chuyenxe.Add(cx);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Thêm thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Xảy ra lỗi khi thêm chuyến xe " + ex.Message });
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
                chuyenXe.MaTuyenxe = dto.MaTuyenxe;
                chuyenXe.MaXe = dto.MaXe;
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
        [HttpPost("tim-chuyen-xe")]
        public async Task<IActionResult> timChuyenXe([FromBody] TimChuyenXeRequestDTO dto)
        {
            try
            {
                //var ds = await _context.ChuyenxeResponseDTO.FromSqlInterpolated(
                //   $@"EXEC sp_TimChuyenXe @MaTinhDi = {dto.MaTinhDi}, @MaTinhDen = {dto.MaTinhDen}, @NgayDi = {dto.Ngaydi}, @Soluongve = {dto.Soluongve}").ToListAsync();
                var ds = await _context.Database.SqlQuery<TimChuyenXeReponseDTO>
                    ($@"EXEC sp_TimChuyenXe @MaTinhDi = {dto.MaTinhDi}, @MaTinhDen = {dto.MaTinhDen}, @NgayDi = {dto.Ngaydi}, @Soluongve = {dto.Soluongve}")
                .ToListAsync();
                return Ok(ds);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi tìm chuyến xe.", Error = ex.Message });
            }
        }
    }
}
