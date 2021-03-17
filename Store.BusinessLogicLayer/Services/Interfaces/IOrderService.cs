using Store.BusinessLogicLayer.Models.Orders;
using Store.BusinessLogicLayer.Models.OrderItems;
using Store.BusinessLogicLayer.Models.Payments;
using Store.DataAccessLayer.Models.Order;
using System.Collections.Generic;
using System.Threading.Tasks;
using Store.DataAccessLayer.Models.Pagination;

namespace Store.BusinessLogicLayer.Services.Interfaces
{
    public interface IOrderService
    {
        public Task PayAsync(PaymentModel model);
        public Task<PagedResponse<OrderModel>> GetFilteredOrderItemsAsync(OrderFilterModel model, PaginationFilterModel pagination);
        public Task CreateOrderAsync(List<CreateOrderItemModel> model);
        public Task<PagedResponse<OrderModel>> GetUserOrdersAsync(PaginationFilterModel pagination);
    }
}
