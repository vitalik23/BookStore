using Microsoft.EntityFrameworkCore;
using Store.DataAccessLayer.AppContext;
using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Models.Order;
using Store.DataAccessLayer.Models.Pagination;
using Store.DataAccessLayer.Repositories.Interfaces;
using Store.Shared.Constants;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;

namespace Store.DataAccessLayer.Repositories.EFRepositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        public OrderRepository(ApplicationContext context) : base(context)
        {

        }

        public async Task<(IEnumerable<Order>, int)> GetFilteredOrdersAsync(OrderFilterModel model, PaginationFilterModel pagination)
        {
            var result = await _dbSet.Include(user => user.User)
                         .Include(orderItem => orderItem.OrderItems)
                            .ThenInclude(printingEdition => printingEdition.PrintingEdition)
                         .Where(order => model.Status == null || order.Status == model.Status)
                         .OrderBy($"{model.SortBy} {model.TypeSort}")
                         .ToListAsync();

            int countElement = result.Count();

            result = result.Skip((pagination.PageNumber - Constants.Page.PAGE_NUMBER) * pagination.PageSize).Take(pagination.PageSize).ToList();

            (IEnumerable<Order>, int) tupleResult = (result, countElement);

            return tupleResult;

        }


        public async Task<(IEnumerable<Order>, int)> GetOrdersByUserIdAsync(string userId, PaginationFilterModel pagination)
        {
            var result = await _dbSet
                               .Include(orderItem => orderItem.OrderItems)
                                    .ThenInclude(printingEdition => printingEdition.PrintingEdition)
                               .Where(order => order.UserId == userId)
                               .OrderByDescending(orderBy => orderBy.CreateDate)
                               .ToListAsync();

            int countElement = result.Count();

            result = result.Skip((pagination.PageNumber - Constants.Page.PAGE_NUMBER) * pagination.PageSize).Take(pagination.PageSize).ToList();

            (IEnumerable<Order>, int) tupleResult = (result, countElement);

            return tupleResult;
        }

        public async Task<Order> GetOrderByIdAsync(long id)
        {
            var result = await _dbSet.FirstOrDefaultAsync(order => order.Id.Equals(id));
            return result;
        }

        public async Task<Payment> GetPaymentByOrderIdAsync(long orderId)
        {
            var result = (await _dbSet.Include(order => order.Payment).FirstOrDefaultAsync(order => order.Id.Equals(orderId))).Payment;
            return result;
        }

    }
}
