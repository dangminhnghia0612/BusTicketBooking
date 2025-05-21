using BusTicketBooking_API.Models;

namespace BusTicketBooking_API.Interfaces
{
    public interface IJwtService
    {
        string TaoToken(Khachhang khachhang);
        string TaoTokenQuantrivien(Quantrivien quantrivien);
    }
}
