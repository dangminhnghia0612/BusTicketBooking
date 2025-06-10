namespace BusTicketBooking_API.DTOs
{
    public class KhachhangRequestDTO
    {
        public string? Sodienthoai { get; set; }
        public string? Email { get; set; }
        public string? Hoten { get; set; }
        public bool? Gioitinh { get; set; }
        public string? Diachi { get; set; }
        public string? Nghenghiep { get; set; }
        public DateTime? Ngaysinh { get; set; }

        public string? Matkhaucu { get; set; }
        public string? Matkhaumoi { get; set; }
    }
}
