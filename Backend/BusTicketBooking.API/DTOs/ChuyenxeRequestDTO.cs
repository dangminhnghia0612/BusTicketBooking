namespace BusTicketBooking.API.DTOs
{
    public class ChuyenxeRequestDTO
    {
        public string Diemdi { get; set; } = null!;
        public string Diemden { get; set; } = null!;
        public DateTime Ngaydi { get; set; }
        public int Soluongve { get; set; }
    }
}
