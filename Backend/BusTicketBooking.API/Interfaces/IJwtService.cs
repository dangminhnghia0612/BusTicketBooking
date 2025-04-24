using BusTicketBooking.API.Models;

namespace BusTicketBooking.API.Interfaces
{
    public interface IJwtService
    {
        string TaoToken(Khachhang khachhang);
    }
}
