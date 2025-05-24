namespace BusTicketBooking_API.DTOs
{
    public class XeRequestDTO
    {
        public int MaLoaixe { get; set; }

        public int MaBenxe { get; set; }
        public string Bienso { get; set; } = null!;

        public string? Ten { get; set; }
    }
}
