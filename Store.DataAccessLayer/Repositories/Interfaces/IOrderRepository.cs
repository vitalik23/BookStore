using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Models.Order;
using Store.DataAccessLayer.Models.Pagination;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Store.DataAccessLayer.Repositories.Interfaces
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        public Task<(IEnumerable<Order>, int)> GetOrdersByUserIdAsync(string userId, PaginationFilterModel pagination);
        public Task<Order> GetOrderByIdAsync(long id);
        public Task<Payment> GetPaymentByOrderIdAsync(long orderId);
        public Task<(IEnumerable<Order>, int)> GetFilteredOrdersAsync(OrderFilterModel model, PaginationFilterModel pagination);
    }
}
