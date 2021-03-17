using Microsoft.Extensions.Options;
using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Repositories.Interfaces;
using Store.Shared.Options;

namespace Store.DataAccessLayer.Repositories.DapperRepositories
{
    public class OrderItemDapperRepository : BaseDapperRepository<OrderItem>, IOrderItemRepository
    {
        public OrderItemDapperRepository(IOptions<StringConnectionOptions> _connectionOptions) : base(_connectionOptions)
        {

        }
    }
}
