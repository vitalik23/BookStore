using Store.DataAccessLayer.Models.Order;
using Store.DataAccessLayer.Models.Pagination;

namespace Store.BusinessLogicLayer.Models.Order
{
    public class OrderFilterAndPaginationModel
    {
        public OrderFilterModel OrderFilterModels { get; set; }
        public PaginationFilterModel PaginationFilterModels { get; set; }
    }
}
