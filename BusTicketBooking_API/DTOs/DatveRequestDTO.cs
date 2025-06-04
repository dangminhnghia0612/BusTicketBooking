namespace BusTicketBooking_API.DTOs
{
    public class DatveRequestDTO
    {
        public int Ma_Chuyenxe { get; set; }
        public int? Ma_Khachhang { get; set; }
        public int Soluong { get; set; }
        public decimal Giagoc { get; set; }
        public decimal Giasaukhuyenmai { get; set; }
        public string? Ghichu { get; set; }
        public string Tenkhachhang { get; set; }
        public string Sodienthoai { get; set; }
        public string Email { get; set; }
        public List<string> dsGhe { get; set; }
    }
}
