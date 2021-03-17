using AutoMapper;
using Store.BusinessLogicLayer.Models.Orders;
using Store.DataAccessLayer.Entities;

namespace Store.BusinessLogicLayer.Mapper
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<OrderModel, Order>();
            CreateMap<Order, OrderModel>();
        }
    }
}
