using BusTicketBooking.API.Data;
using BusTicketBooking.API.DTOs;
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
                var ds = await _context.ChuyenxeResponseDTO.FromSqlInterpolated(
                   $@"EXEC sp_TimChuyenXe @TinhDi = {dto.Diemdi}, @TinhDen = {dto.Diemden}, @NgayDi = {dto.Ngaydi}, @Soluongve = {dto.Soluongve}").ToListAsync();
                if (ds.Count == 0 )
                {
                    return NotFound(new {Message = "Không tìm thấy"});
                }
                return Ok(ds);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Xảy ra lỗi khi tìm chuyến xe.", Error = ex.Message });
            }
        }
    }
}
