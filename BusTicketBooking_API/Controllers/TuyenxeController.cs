using BusTicketBooking_API.Data;
using BusTicketBooking_API.DTOs;
using BusTicketBooking_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BusTicketBooking_API.Controllers
{
    [Authorize(Roles = "1")]
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
                var data = await _context.TuyenxeView.AsNoTracking().ToListAsync();

                var dsTuyenXe = data
                    .GroupBy(x => new { x.MaTuyenxe, x.Khoangthoigian, x.Khoangcach, x.Giave })
                    .Select(g => new TuyenxeResponseDTO
                    {
                        MaTuyenXe = g.Key.MaTuyenxe,
                        KhoangThoiGian = g.Key.Khoangthoigian,
                        KhoangCach = g.Key.Khoangcach,
                        GiaVe = g.Key.Giave,
                        LoTrinh = g.OrderBy(x => x.Thutu)
                                   .Select(x => new LotrinhItemDTO
                                   {
                                       Thutu = x.Thutu,
                                       MaTinh = x.MaTinh,
                                       MaBenxe = x.MaBenxe,
                                       TenBenXe = x.Tenbenxe,
                                       TenTinh = x.Tentinh
                                   }).ToList()
                    }).OrderBy(tx => tx.MaTuyenXe) 
                    .ToList();

                return Ok(dsTuyenXe);

            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi lấy ds xe.", Error = ex.Message });
            }
        }
        [HttpDelete("{matuyen}")]
        public async Task<IActionResult> xoaTuyenXe(int matuyen)
        {
            try
            {
                var tuyenxe = await _context.Tuyenxe.Include(tx => tx.Lotrinh)
                                                    .FirstOrDefaultAsync(tx => tx.MaTuyenxe == matuyen);
                if (tuyenxe == null)
                {
                    return NotFound(new { message = "Không tìm thấy tuyến xe" });
                }
                var chuyenxe = await _context.Chuyenxe.AnyAsync(cx => cx.MaTuyenxe == matuyen);
                if (chuyenxe)
                {
                    return BadRequest(new { message = "Tuyến này đã có chuyến xe" });
                }
                //XÓA LỘ TRÌNH -> XÓA TUYẾN
                if (tuyenxe.Lotrinh != null && tuyenxe.Lotrinh.Any())
                {
                    _context.Lotrinh.RemoveRange(tuyenxe.Lotrinh);
                }


                _context.Tuyenxe.Remove(tuyenxe);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Xóa thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Xảy ra lỗi khi xóa tuyến xe: " + ex.Message });
            }
        }
        [HttpPost]
        public async Task<IActionResult> themTuyenXe(TuyenxeRequestDTO dto)
        {
            try
            {
                if (dto.Lotrinh == null || !dto.Lotrinh.Any())
                {
                    return BadRequest(new { message = "Lộ trình không được để trống" });
                }
                var allTuyen = await _context.Tuyenxe
                                             .Include(tx => tx.Lotrinh)
                                             .Where(tx => tx.Lotrinh.Count == dto.Lotrinh.Count)
                                             .ToListAsync();

                var loTrinhMoi = dto.Lotrinh;

                bool existed = allTuyen.Any(tx =>tx.Lotrinh
                                      .OrderBy(l => l.Thutu)
                                      .Select(l => l.MaBenxe)
                                      .SequenceEqual(loTrinhMoi));
                if (existed)
                {
                    return BadRequest(new { message = "Tuyến xe đã tồn tại!" });
                }
                Tuyenxe tuyenxe = new Tuyenxe
                {
                    Khoangthoigian = dto.Khoangthoigian,
                    Khoangcach = dto.Khoangcach,
                    Giave = dto.Giave
                };
                _context.Tuyenxe.Add(tuyenxe);
                await _context.SaveChangesAsync();

                // Thêm lộ trình
                _context.Lotrinh.Add(new Lotrinh {
                    MaTuyenxe = tuyenxe.MaTuyenxe,
                    MaBenxe = dto.Lotrinh[0],
                    Labendau = true,
                    Thutu = 1
                });
                _context.Lotrinh.Add(new Lotrinh
                {
                    MaTuyenxe = tuyenxe.MaTuyenxe,
                    MaBenxe = dto.Lotrinh.Last(),
                    Labencuoi = true,
                    Thutu = dto.Lotrinh.Count
                });
                for(int i = 1; i < dto.Lotrinh.Count -1; i++)
                {
                    Lotrinh lt = new Lotrinh
                    {
                        MaTuyenxe = tuyenxe.MaTuyenxe,
                        MaBenxe = dto.Lotrinh[i],
                        Labentrunggian = true,
                        Thutu = i + 1
                    };
                    _context.Lotrinh.Add(lt);
                }
                await _context.SaveChangesAsync();
                return Ok(new { message = "Thêm thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Xảy ra lỗi khi thêm tuyến xe: " + ex.Message });
            }
        }

        [HttpPut("{matuyen}")]
        public async Task<IActionResult> suaTuyenXe(int matuyen, [FromBody] TuyenxeRequestDTO dto)
        {
            try
            {
                var tuyenxe = await _context.Tuyenxe
                    .Include(tx => tx.Lotrinh)
                    .FirstOrDefaultAsync(tx => tx.MaTuyenxe == matuyen);

                if (tuyenxe == null)
                    return NotFound(new { message = "Không tìm thấy tuyến xe!" });

                if (dto.Lotrinh == null || !dto.Lotrinh.Any())
                    return BadRequest(new { message = "Lộ trình không được để trống" });


                var allTuyen = await _context.Tuyenxe
                    .Include(tx => tx.Lotrinh)
                    .Where(tx => tx.MaTuyenxe != matuyen && tx.Lotrinh.Count == dto.Lotrinh.Count)
                    .ToListAsync();


                bool existed = allTuyen.Any(tx => tx.Lotrinh
                    .OrderBy(l => l.Thutu)
                    .Select(l => l.MaBenxe)
                    .SequenceEqual(dto.Lotrinh));
                if (existed)
                    return BadRequest(new { message = "Tuyến xe đã tồn tại!" });
                

                tuyenxe.Khoangthoigian = dto.Khoangthoigian;
                tuyenxe.Khoangcach = dto.Khoangcach;
                tuyenxe.Giave = dto.Giave;


                _context.Lotrinh.RemoveRange(tuyenxe.Lotrinh);


                _context.Lotrinh.Add(new Lotrinh
                {
                    MaTuyenxe = tuyenxe.MaTuyenxe,
                    MaBenxe = dto.Lotrinh[0],
                    Labendau = true,
                    Thutu = 1
                });
                _context.Lotrinh.Add(new Lotrinh
                {
                    MaTuyenxe = tuyenxe.MaTuyenxe,
                    MaBenxe = dto.Lotrinh.Last(),
                    Labencuoi = true,
                    Thutu = dto.Lotrinh.Count
                });
                for (int i = 1; i < dto.Lotrinh.Count - 1; i++)
                {
                    Lotrinh lt = new Lotrinh
                    {
                        MaTuyenxe = tuyenxe.MaTuyenxe,
                        MaBenxe = dto.Lotrinh[i],
                        Labentrunggian = true,
                        Thutu = i + 1
                    };
                    _context.Lotrinh.Add(lt);
                }

                await _context.SaveChangesAsync();
                return Ok(new { message = "Sửa thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Xảy ra lỗi khi sửa tuyến xe: " + ex.Message });
            }
        }

        [HttpGet("layDSTuyenXeTheoTinh")]
        public async Task<IActionResult> layDSTuyenXeTheoTinh([FromQuery] int maTinhDi, [FromQuery] int maTinhDen)
        {
            try
            {

                var dsTuyenXe = await (from tx in _context.Tuyenxe
                                      join l1 in _context.Lotrinh on tx.MaTuyenxe equals l1.MaTuyenxe
                                      join bx1 in _context.Benxe on l1.MaBenxe equals bx1.MaBenxe
                                      join q1 in _context.Quan on bx1.MaQuan equals q1.MaQuan

                                      join l2 in _context.Lotrinh on tx.MaTuyenxe equals l2.MaTuyenxe
                                      join bx2 in _context.Benxe on l2.MaBenxe equals bx2.MaBenxe
                                      join q2 in _context.Quan on bx2.MaQuan equals q2.MaQuan

                                      where q1.MaTinh == maTinhDi && l1.Labendau == true
                                         && q2.MaTinh == maTinhDen && l2.Labencuoi == true
                                      select new
                                      {
                                          MaTuyenxe = tx.MaTuyenxe,
                                          MaBendi = bx1.MaBenxe,
                                          Bendi = bx1.Tenbenxe,
                                          Benden = bx2.Tenbenxe
                                      }).ToListAsync();
                return Ok(dsTuyenXe);

            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi lấy ds xe.", Error = ex.Message });
            }
        }
    }
}
