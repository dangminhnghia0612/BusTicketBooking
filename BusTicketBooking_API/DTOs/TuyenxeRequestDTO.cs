namespace BusTicketBooking_API.DTOs
{
    public class TuyenxeRequestDTO
    {
        public int? Khoangthoigian { get; set; }

        public decimal? Khoangcach { get; set; }

        public decimal? Giave { get; set; }
        public List<int> Lotrinh { get; set; }
    }
}
