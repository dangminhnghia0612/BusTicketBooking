namespace BusTicketBooking_API.DTOs
{
    public class TimChuyenXeResponseDTO
    {
        public int Ma_Chuyenxe { get; set; }
        public DateTime Giodi { get; set; }
        public DateTime Gioden { get; set; }
        public int Khoangthoigian { get; set; }
        public decimal Giave { get; set; }
        public string Bendi { get; set; }
        public string Benden { get; set; }
        public string Tenloai { get; set; }
        public int SoGheConTrong { get; set; }
    }
}
