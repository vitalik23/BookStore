using Store.DataAccessLayer.AppContext;
using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Repositories.Interfaces;

namespace Store.DataAccessLayer.Repositories.EFRepositories
{
    public class OrderItemRepository : GenericRepository<OrderItem> , IOrderItemRepository
    {
        public OrderItemRepository(ApplicationContext context) : base(context)
        {

        }

    }
}
