using static Store.Shared.Enums.Enums;

namespace Store.BusinessLogicLayer.Models.OrderItems
{
    public class CreateOrderItemModel
    {
        public decimal Amount { get; set; }
        public int Count { get; set; }
        public long PrintingEditionId { get; set; }
        public CurrencyType Currency { get; set; }
        public long OrderId { get; set; }
    }
}
