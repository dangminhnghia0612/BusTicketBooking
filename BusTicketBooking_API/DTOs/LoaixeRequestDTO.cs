namespace BusTicketBooking_API.DTOs
{
    public class LoaixeRequestDTO
    {
        public string? Tenloai { get; set; }

        public int? Soluongghe { get; set; }

        public bool? Nhavesinh { get; set; }
        public SodogheDTO Sodoghe { get; set; }
    }
}
