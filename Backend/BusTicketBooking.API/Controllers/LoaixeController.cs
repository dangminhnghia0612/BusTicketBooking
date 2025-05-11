using BusTicketBooking.API.Data;
using BusTicketBooking.API.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BusTicketBooking.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoaixeController : ControllerBase
    {
        private readonly QLBanvexeDbContext _context;
        public LoaixeController(QLBanvexeDbContext context)
        {
            _context = context;
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
                                                nvs = lx.Nhavesinh
                                            })
                                            .ToListAsync();
                return Ok(dsLoaiXe);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi lấy ds xe.", Error = ex.Message });
            }
        }
        [HttpPost(("laySoDoGhe"))]
        public async Task<IActionResult> getSodoghefromMaChuyenxe([FromBody] int machuyenxe)
        {
            try
            {
                var sodo = await _context.Chuyenxe.Where(cx => cx.MaChuyenxe == machuyenxe)
                                            .Select(cx => cx.MaXeNavigation.MaLoaixeNavigation.Sodoghe)
                                            .FirstOrDefaultAsync();
                if (sodo == null)
                    return NotFound("Không tìm thấy sơ đồ ghế cho chuyến xe này");
                var chuanHoa = sodo.Replace("\r", "").Replace("\n", "").Replace("\t", "");
                return Ok(new { sodoghe = chuanHoa });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi tìm sơ đồ.", Error = ex.Message });
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

                _context.Loaixe.Remove(loaixe);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Xóa thành công" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Xảy ra lỗi khi xóa xe " + ex.Message });
            }
        }




    }
}
