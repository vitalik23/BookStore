
namespace Store.BusinessLogicLayer.Models.Payments
{
    public class PaymentModel
    {
        public string CardNumber { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public string CVC { get; set; }
        public int Value { get; set; }
        public string Description { get; set; }
        public long OrderId { get; set; }
    }
}
