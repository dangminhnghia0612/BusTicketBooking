namespace BusTicketBooking_API.Payment.VnPay
{
    public class PaymentInformationModel
    {
        public string? OrderType { get; set; }
        public double Amount { get; set; }
        public string? OrderDescription { get; set; }
        public string Name { get; set; }
        public int MaDatve { get; set; }
        public List<string> dsGhe { get; set; }

    }
}
