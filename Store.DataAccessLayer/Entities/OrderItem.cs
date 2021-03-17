using Dapper.Contrib.Extensions;
using Store.DataAccessLayer.Entities.Base;
using System.ComponentModel.DataAnnotations.Schema;
using static Store.Shared.Enums.Enums;

namespace Store.DataAccessLayer.Entities
{
    public class OrderItem : BaseEntity
    {
        [Column(TypeName = "decimal(18,4)")]
        public decimal Amount { get; set; }
        public CurrencyType Currency { get; set; }
        public int Count { get; set; }

        public long PrintingEditionId { get; set; }
        public long OrderId { get; set; }

        [Computed]
        public virtual Order Order { get; set; }
        [Computed]
        public virtual PrintingEdition PrintingEdition { get; set; }
    }
}
