using Dapper.Contrib.Extensions;
using Store.DataAccessLayer.Entities.Base;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using static Store.Shared.Enums.Enums;

namespace Store.DataAccessLayer.Entities
{
    public class Order : BaseEntity
    {
        public string Description { get; set; }
        public StatusType Status { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal TotalAmount { get; set; }

        public string UserId { get; set; }
        public long PaymentId { get; set; }

        [Computed]
        public virtual User User { get; set; }
        [Computed]
        public virtual Payment Payment { get; set; }
        [Computed]
        public ICollection<OrderItem> OrderItems { get; set; }

        public Order()
        {
            OrderItems = new List<OrderItem>();
        }
    }
}
