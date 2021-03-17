using Store.DataAccessLayer.Entities.Base;
using System.Collections.Generic;
using static Store.Shared.Enums.Enums;
using Store.DataAccessLayer.Entities;

namespace Store.BusinessLogicLayer.Models.Orders
{
    public class OrderModel: BaseEntity
    {
        public string Description { get; set; }
        public StatusType Status { get; set; }
        public decimal TotalAmount { get; set; }
        public string UserId { get; set; }
        public long PaymentId { get; set; }

        public User User { get; set; }
        public Payment Payment { get; set; }

        public List<OrderItem> OrderItems { get; set; }
    }
}
