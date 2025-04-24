namespace BusTicketBooking.API.Interfaces
{
    public interface IEmailService
    {
        Task GuiEmailAsync(string to, string subject, string body);
    }
}
