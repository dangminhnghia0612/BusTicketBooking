using BusTicketBooking.API.Data;
using BusTicketBooking.API.DTOs;
using BusTicketBooking.API.Interfaces;
using BusTicketBooking.API.Models;
using BusTicketBooking.API.Payment.VnPay;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Threading.Tasks;

namespace BusTicketBooking.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThanhtoanController : ControllerBase
    {
        private readonly IVnPayService _vnPayService;
        private readonly QLBanvexeDbContext _context;
        public ThanhtoanController(IVnPayService vnPayService, QLBanvexeDbContext context)
        {
            _vnPayService = vnPayService;
            _context = context;
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
            string mathanhtoan = Request.Query["vnp_TxnRef"];
            decimal amount = decimal.Parse(Request.Query["vnp_Amount"]) / 100;
            string ghichu = Request.Query["vnp_OrderInfo"];
            string magiaodich = Request.Query["vnp_TransactionNo"];
            var payDateString = Request.Query["vnp_PayDate"];
            var ngaythanhtoan = DateTime.ParseExact(payDateString, "yyyyMMddHHmmss", CultureInfo.InvariantCulture);
            var maDatVe = Request.Query["Ma_Datve"];
            return Ok(new { success = true, message = "Thanh toán thành công và đã lưu vào CSDL" });
        }
        [HttpPost("XulyVnPay")]
        public async Task<IActionResult> XulyVnPay([FromBody] VnPayResponseDTO dto)
        {
            Datve dv = await _context.Datve.FindAsync(dto.MaDatve);
            var cx = await _context.Chuyenxe.Where(x => x.MaChuyenxe == dv.MaChuyenxe).FirstOrDefaultAsync();
            var gheCanCapNhat = await _context.Ghe.Where(g => g.MaXe == cx.MaXe && dto.dsGhe.Contains(g.Soghe)).ToListAsync();
            if (!dto.TrangThaiGiaoDich.Equals("00"))
            {

                //thay đổi tình trạng đặt vé sang hủy
                dv.MaTinhtrang = 3;
                _context.Datve.Update(dv);
                //cập nhật trạng thái ghế sang 0
                foreach (var ghe in gheCanCapNhat)
                {
                    ghe.Trangthai = false;
                }
                await _context.SaveChangesAsync();
                return BadRequest(new { code = dto.TrangThaiGiaoDich });
            }
            //Thành công
            dv.MaTinhtrang = 4;
            //Thêm dữ liệu vào bảng Thanhtoan
            var payDateString = dto.Ngaythanhtoan;
            var ngaythanhtoan = DateTime.ParseExact(payDateString, "yyyyMMddHHmmss", CultureInfo.InvariantCulture);
            decimal sotien = decimal.Parse(dto.Sotien) / 100;
            Thanhtoan tt = new Thanhtoan()
            {
                MaPhuongthuc = 1,
                MaDatve = dto.MaDatve,
                Ngaythanhtoan = ngaythanhtoan,
                Sotien = sotien,
                Ghichu = dto.Ghichu,
                MaGiaodich = dto.MaGiaodich
            };
            _context.Thanhtoan.Add(tt);

            //Thêm vé
            foreach (var ghe in gheCanCapNhat)
            {
                var tuyenxe = await _context.Tuyenxe.Where(t => t.MaTuyenxe == cx.MaTuyenxe).FirstOrDefaultAsync(); 
                Vexe vx = new Vexe()
                {
                    MaChuyenxe = dv.MaChuyenxe,
                    MaDatve = dv.MaDatve,
                    MaGhe = ghe.MaGhe,
                    Giave = tuyenxe.Giave
                };
                _context.Vexe.Add(vx);
            }
            await _context.SaveChangesAsync();
            return Ok(new { code = dto.TrangThaiGiaoDich });
        }

    }
}
