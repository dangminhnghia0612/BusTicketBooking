namespace BusTicketBooking_API.DTOs
{
    public class VnPayResponseDTO
    {
        public int MaDatve { get; set; }
        public List<string> dsGhe { get; set; }
        public string Sotien { get; set; }
        public string TrangThaiGiaoDich { get; set; } // vnp_TransactionStatus
        public string Ghichu { get; set; } // vnp_OrderInfo
        public string MaGiaodich { get; set; } // vnp_TransactionNo
        public string Ngaythanhtoan { get; set; } // vnp_PayDate
    }
}
