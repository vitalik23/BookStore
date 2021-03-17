using AutoMapper;
using Store.BusinessLogicLayer.Models.OrderItems;
using Store.BusinessLogicLayer.Services.Interfaces;
using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Store.BusinessLogicLayer.Services
{
    public class OrderItemService : IOrderItemService
    {
        private IOrderItemRepository _orderItemRepository;
        private IMapper _autoMapper;
        public OrderItemService(IOrderItemRepository orderItemRepository, IMapper autoMapper)
        {
            _orderItemRepository = orderItemRepository;
            _autoMapper = autoMapper;
        }

        public async Task CreateOrderItemAsync(long orderId, List<CreateOrderItemModel> model)
        {

            model.ForEach(item =>
            {
                item.OrderId = orderId;
            });

            var orderItems = _autoMapper.Map<List<OrderItem>>(model);

            await _orderItemRepository.AddRangeAsync(orderItems);
        }


    }
}
