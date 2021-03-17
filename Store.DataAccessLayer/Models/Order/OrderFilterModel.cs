using static Store.Shared.Enums.Enums;

namespace Store.DataAccessLayer.Models.Order
{
    public class OrderFilterModel
    {
        public string SortBy { get; set; }
        public string TypeSort { get; set; }
        public StatusType? Status { get; set; }
    }
}
