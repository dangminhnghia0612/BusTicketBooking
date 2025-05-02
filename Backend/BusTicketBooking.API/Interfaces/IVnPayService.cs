using BusTicketBooking.API.Payment.VnPay;

namespace BusTicketBooking.API.Interfaces
{
    public interface IVnPayService
    {
        string CreatePaymentUrl(PaymentInformationModel model, HttpContext context);
        PaymentResponseModel PaymentExecute(IQueryCollection collections);

    }
}
