using Store.BusinessLogicLayer.Models.OrderItems;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Store.BusinessLogicLayer.Services.Interfaces
{
    public interface IOrderItemService
    {
        public Task CreateOrderItemAsync(long orderId, List<CreateOrderItemModel> model);
    }
}
