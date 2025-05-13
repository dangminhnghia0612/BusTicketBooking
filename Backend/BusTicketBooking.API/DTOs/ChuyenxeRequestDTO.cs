namespace BusTicketBooking.API.DTOs
{
    public class ChuyenxeRequestDTO
    {
        public string? Diemdi { get; set; }
        public string? Diemden { get; set; }
        public DateTime? Ngaydi { get; set; }
        public int? Soluongve { get; set; }

        public int? MaTuyenxe { get; set; }

        public int? MaXe { get; set; }

        public DateTime? Giodi { get; set; }
    }
}
