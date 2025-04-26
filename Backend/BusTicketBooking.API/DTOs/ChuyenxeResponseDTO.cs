using Microsoft.EntityFrameworkCore;

namespace BusTicketBooking.API.DTOs
{
    public class ChuyenxeResponseDTO
    {
        public int Ma_Chuyenxe { get; set; }
        public DateTime Giodi { get; set; }
        public DateTime Gioden { get; set; }
        public int Khoangthoigian { get; set; }
        public decimal Giave { get; set; }
        public string Diemdi { get; set; }
        public string Diemden { get; set; }
        public string Tenloai { get; set; }
        public int SoGheConTrong { get; set; }


    }
}
