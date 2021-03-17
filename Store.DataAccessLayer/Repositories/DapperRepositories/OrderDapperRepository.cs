using Dapper;
using Dapper.Contrib.Extensions;
using Microsoft.Extensions.Options;
using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Models.Order;
using Store.DataAccessLayer.Models.Pagination;
using Store.DataAccessLayer.Repositories.Interfaces;
using Store.Shared.Constants;
using Store.Shared.Options;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.DataAccessLayer.Repositories.DapperRepositories
{
    public class OrderDapperRepository : BaseDapperRepository<Order>, IOrderRepository
    {
        public OrderDapperRepository(IOptions<StringConnectionOptions> _connectionOptions) : base(_connectionOptions)
        {

        }

        
        public async Task<(IEnumerable<Order>, int)> GetFilteredOrdersAsync(OrderFilterModel model, PaginationFilterModel pagination)
        {
            using (var connection = CreateConnection())
            {
                var status = new StringBuilder();

                if(model.Status is not null)
                {
                    status.Append((int)model.Status);
                }

                var sql = new StringBuilder();
                sql.Append($"SELECT o.* , us.* , pe.*, orderItem.Id, orderItem.Count FROM Orders AS o");
                sql.Append($" INNER JOIN AspNetUsers AS us on us.Id = o.UserId");
                sql.Append($" INNER JOIN OrderItems AS orderItem on orderItem.OrderId = o.Id");
                sql.Append($" INNER JOIN PrintingEditions AS pe on orderItem.PrintingEditionId = pe.Id");
                sql.Append($" WHERE ((@status = '' OR @status = null) OR o.Status = @status)");

                var orders = await connection.QueryAsync<Order, User, PrintingEdition, OrderItem, Order>(sql.ToString(), 
                    (order, user, printingEdition, orderItem) => 
                    {
                        order.User = user;
                        orderItem.PrintingEdition = printingEdition;

                        order.OrderItems.Add(orderItem);
                       return order;
                    },
                    new { status = status.ToString() },
                    splitOn: "Id");

                var groupedOrders = orders.GroupBy(order => order.Id).Select(groupOrder =>
                {
                    var groupedOrder = groupOrder.First();
                    groupedOrder.OrderItems = groupOrder.Select(order => order.OrderItems.Single()).ToList();
                    return groupedOrder;
                });

                int countElement = orders.Count();

                groupedOrders = groupedOrders.Skip((pagination.PageNumber - Constants.Page.PAGE_NUMBER) * pagination.PageSize).Take(pagination.PageSize).ToList();

                (IEnumerable<Order>, int) tupleResult = (groupedOrders, countElement);

                return tupleResult;

            }
        }

        public async Task<Order> GetOrderByIdAsync(long id)
        {
            using (var connection = CreateConnection())
            {
                var result = await connection.GetAsync<Order>(id);
                return result;
            }
        }

        public async Task<(IEnumerable<Order>, int)> GetOrdersByUserIdAsync(string userId, PaginationFilterModel pagination)
        {
            using (var connection = CreateConnection())
            {
                var sql = new StringBuilder();
                sql.Append($"SELECT o.*, pe.*, orderItem.Id, orderItem.Count FROM Orders AS o");
                sql.Append($" INNER JOIN OrderItems AS orderItem on orderItem.OrderId = o.Id");
                sql.Append($" INNER JOIN PrintingEditions AS pe on orderItem.PrintingEditionId = pe.Id");
                sql.Append($" ORDER BY o.Id DESC");

                var orders = await connection.QueryAsync<Order, PrintingEdition, OrderItem, Order>(sql.ToString(),
                    (order, printingEdition, orderItem) =>
                    {
                        orderItem.PrintingEdition = printingEdition;
                        order.OrderItems.Add(orderItem);

                        return order;
                    },
                    splitOn: "Id");

                var groupedOrders = orders.GroupBy(order => order.Id).Select(groupOrder =>
                {
                    var groupedOrder = groupOrder.First();
                    groupedOrder.OrderItems = groupOrder.Select(order => order.OrderItems.FirstOrDefault()).ToList(); ;
                    return groupedOrder;
                });

                int countElement = orders.Count();

                groupedOrders = groupedOrders.Skip((pagination.PageNumber - Constants.Page.PAGE_NUMBER) * pagination.PageSize).Take(pagination.PageSize).ToList();

                (IEnumerable<Order>, int) tupleResult = (groupedOrders, countElement);

                return tupleResult;

            }
        }

        public async Task<Payment> GetPaymentByOrderIdAsync(long orderId)
        {
            var sql = new StringBuilder();
            sql.Append("SELECT pay.* FROM Payments as pay");
            sql.Append($" INNER JOIN Orders as ord ON ord.PaymentId = pay.Id");
            sql.Append($" WHERE ord.Id = @orderId");

            using (var connection = CreateConnection())
            {
                var result = await connection.QueryFirstOrDefaultAsync<Payment>(sql.ToString(), new { orderId = orderId});
                return result;
            }
        }
    }
}
