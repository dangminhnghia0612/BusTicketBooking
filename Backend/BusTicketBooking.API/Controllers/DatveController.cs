using BusTicketBooking.API.Data;
using BusTicketBooking.API.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace BusTicketBooking.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DatveController : ControllerBase
    {
        private readonly QLBanvexeDbContext _context;
        public DatveController(QLBanvexeDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<IActionResult> ThemDatVe([FromBody] DatveRequestDTO dto)
        {
            var parameters = new[]
            {
        new SqlParameter("@Ma_Chuyenxe", dto.Ma_Chuyenxe),
        new SqlParameter("@Ma_Khachhang", dto.Ma_Khachhang),
        new SqlParameter("@Soluong", dto.Soluong),
        new SqlParameter("@Giagoc", dto.Giagoc),
        new SqlParameter("@Giasaukhuyenmai", dto.Giasaukhuyenmai),
        new SqlParameter("@Ghichu", (object?)dto.Ghichu ?? DBNull.Value),
        new SqlParameter("@Tenkhachhang", dto.Tenkhachhang),
        new SqlParameter("@Sodienthoai", dto.Sodienthoai),
        new SqlParameter("@Email", dto.Email),
    };

            var result = await _context.Set<DatveResponseDTO>()
                .FromSqlRaw("EXEC sp_ThemDatVe @Ma_Chuyenxe, @Ma_Khachhang, @Soluong, @Giagoc, @Giasaukhuyenmai, @Ghichu, @Tenkhachhang, @Sodienthoai, @Email", parameters)
                .ToListAsync();

            if (result.Count > 0)
            {
                return Ok(new { message = "Đặt vé thành công", maDatVe = result[0].Ma_Datve });
            }

            return BadRequest("Đặt vé thất bại");
        }
    }
}
