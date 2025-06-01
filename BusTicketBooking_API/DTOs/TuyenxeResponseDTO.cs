namespace BusTicketBooking_API.DTOs
{
    public class TuyenxeResponseDTO
    {
        public int? MaTuyenXe { get; set; }
        public List<LotrinhItemDTO> LoTrinh { get; set; }
        public int? KhoangThoiGian { get; set; }
        public decimal? KhoangCach { get; set; }
        public decimal? GiaVe { get; set; }
    }
}
