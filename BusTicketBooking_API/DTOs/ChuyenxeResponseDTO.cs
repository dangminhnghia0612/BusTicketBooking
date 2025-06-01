namespace BusTicketBooking_API.DTOs
{
    public class ChuyenxeResponseDTO
    {
        public int MaChuyenxe { get; set; }

        public int MaTuyenxe { get; set; }

        public int MaXe { get; set; }
        public string Bienso { get; set; }

        public DateTime Giodi { get; set; }

        public DateTime Gioden { get; set; }
        public List<LotrinhItemDTO> LoTrinh { get; set; }
    }
}
