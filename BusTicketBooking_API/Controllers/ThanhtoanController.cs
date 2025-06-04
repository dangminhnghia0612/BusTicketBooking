using BusTicketBooking_API.Data;
using BusTicketBooking_API.DTOs;
using BusTicketBooking_API.Interfaces;
using BusTicketBooking_API.Models;
using BusTicketBooking_API.Payment.VnPay;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace BusTicketBooking_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThanhtoanController : ControllerBase
    {
        private readonly IVnPayService _vnPayService;
        private readonly QLBanvexeDbContext _context;
        private readonly IEmailService _emailService;
        public ThanhtoanController(IVnPayService vnPayService, QLBanvexeDbContext context, IEmailService emailService)
        {
            _vnPayService = vnPayService;
            _context = context;
            _emailService = emailService;
        }
        [HttpPost]
        public IActionResult CreatePaymentUrlVnpay([FromBody] PaymentInformationModel model)
        {
            model.OrderDescription = "Thanh toán qua VnPay";
            model.OrderType = "other";
            var paymentUrl = _vnPayService.CreatePaymentUrl(model, HttpContext);

            return Ok(new { url = paymentUrl });
        }
        [HttpGet]
        public IActionResult PaymentCallbackVnpay()
        {
            var response = _vnPayService.PaymentExecute(Request.Query);
            if (response.VnPayResponseCode != "00")
            {
                return BadRequest(new { message = "Thanh toán không thành công!" });
            }
            return Ok(new { success = true, message = "Thanh toán thành công và đã lưu vào CSDL" });
        }
        [HttpPost("XulyVnPay")]
        public async Task<IActionResult> XulyVnPay([FromBody] VnPayResponseDTO dto)
        {
            var dv = await _context.Datve.Where(x => x.MaDatve == dto.MaDatve)
                                           .Include(x => x.MaChuyenxeNavigation)
                                           .FirstOrDefaultAsync();
            if (dv == null)
            {
                return BadRequest(new { message = "Đặt vé không tồn tại" });
            }
            var dsVeXe = await _context.Vexe.Where(x => x.MaDatve == dto.MaDatve).ToListAsync();

            //Hủy thanh toán
            if (!dto.TrangThaiGiaoDich.Equals("00"))
            {

                //thay đổi tình trạng đặt vé sang hủy
                dv.MaTinhtrang = 3;

                //cập nhật trạng thái ghế sang 0 và xóa vé xe
                foreach (var vexe in dsVeXe)
                {
                    var ctg = await _context.Chitietghe.FindAsync(vexe.MaChitietghe);
                    ctg.Trangthai = false;
                    _context.Vexe.Remove(vexe);
                }
                await _context.SaveChangesAsync();
                return BadRequest(new { code = dto.TrangThaiGiaoDich });
            }
            //Thành công
            dv.MaTinhtrang = 4;
            //Thêm dữ liệu vào bảng lịch sử thanh toán
            var ngaythanhtoan = DateTime.ParseExact(dto.Ngaythanhtoan, "yyyyMMddHHmmss", CultureInfo.InvariantCulture);
            decimal sotien = decimal.Parse(dto.Sotien) / 100;
            Lichsuthanhtoan tt = new Lichsuthanhtoan()
            {
                MaPhuongthuc = 1,
                MaDatve = dto.MaDatve,
                Ngaythanhtoan = ngaythanhtoan,
                Sotien = sotien,
                Ghichu = dto.Ghichu,
                MaGiaodich = dto.MaGiaodich
            };
            _context.Lichsuthanhtoan.Add(tt);

            var vx = await _context.Vexe.AsNoTracking().Where(v => v.MaDatve == dto.MaDatve)
                                                      .Select(v => new
                                                      {
                                                          Giave = v.Giave,
                                                          Ngaygiodi = v.MaChitietgheNavigation.MaChuyenxeNavigation.Giodi,
                                                          Bienso = v.MaChitietgheNavigation.MaChuyenxeNavigation.MaXeNavigation.Bienso
                                                      }).FirstOrDefaultAsync();
            var bendi = await _context.Lotrinh.AsNoTracking().Where(lt => lt.MaTuyenxe == dv.MaChuyenxeNavigation.MaTuyenxe && lt.Labendau == true)
                                                             .Select(lt => new
                                                             {
                                                                Tenbenxe = lt.MaBenxeNavigation.Tenbenxe
                                                             }).FirstOrDefaultAsync();
            var benden = await _context.Lotrinh.AsNoTracking().Where(lt => lt.MaTuyenxe == dv.MaChuyenxeNavigation.MaTuyenxe && lt.Labencuoi == true)
                                                             .Select(lt => new
                                                             {
                                                                 Tenbenxe = lt.MaBenxeNavigation.Tenbenxe
                                                             }).FirstOrDefaultAsync();

            string ngaydi = vx.Ngaygiodi.Value.ToString("dd/MM/yyyy");
            string giodi = vx.Ngaygiodi.Value.ToString("HH:mm");
            string dsGhe = string.Join(", ", dto.dsGhe);
            //gửi email
            string templatePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Templates", "email_ticket_template.html");
            string htmlBody = System.IO.File.ReadAllText(templatePath);
            htmlBody = htmlBody
                                .Replace("{{Hoten}}", dv.Tenkhachhang)
                                .Replace("{{Mave}}", dv.MaDatve.ToString())
                                .Replace("{{Ngaydat}}", dv.Ngaydat.ToString("dd/MM/yyyy HH:mm:ss"))
                                .Replace("{{Tenphuongthuc}}", "VnPay")
                                //.Replace("{{QrCodeUrl}}", "https://example.com/qrcode.png")
                                .Replace("{{Email}}", dv.Email)
                                .Replace("{{Sodienthoai}}", dv.Sodienthoai)
                                .Replace("{{Diemdi}}", bendi.Tenbenxe)
                                .Replace("{{Diemden}}", benden.Tenbenxe)
                                .Replace("{{Giodi}}", giodi)
                                .Replace("{{Ngaydi}}", ngaydi)
                                .Replace("{{dsGhe}}", dsGhe)
                                .Replace("{{Bienso}}", vx.Bienso)
                                .Replace("{{Giave}}", vx.Giave.ToString())
                                .Replace("{{Soluongve}}", dsVeXe.Count.ToString())
                                .Replace("{{Tongtien}}", dv.Giagoc.ToString());
            await _emailService.GuiEmailAsync(dv.Email, "Nhà xe Minh Nghĩa - Xác nhận đặt vé", htmlBody);
            await _context.SaveChangesAsync();
            return Ok(new { code = dto.TrangThaiGiaoDich });
        }
    }
}
