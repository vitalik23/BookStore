using AutoMapper;
using Store.BusinessLogicLayer.Models.OrderItems;
using Store.BusinessLogicLayer.Providers;
using Store.DataAccessLayer.Entities;
using static Store.Shared.Enums.Enums;

namespace Store.BusinessLogicLayer.Mapper
{
    public class OrderItemProfile : Profile
    {
        private ConvertCurrencyProvider _convert;
        public OrderItemProfile(ConvertCurrencyProvider convert)
        {
            _convert = convert;
        }


        public OrderItemProfile()
        {
            CreateMap<OrderItem, CreateOrderItemModel>();
            CreateMap<CreateOrderItemModel, OrderItem>()
                .ForMember(item => item.Amount, model => model.MapFrom(c => _convert.Convert(c.Amount, c.Currency, CurrencyType.USD)))
                .ForMember(item => item.Count, model => model.MapFrom(c => c.Count))
                .ForMember(item => item.Currency, model => model.MapFrom(c => CurrencyType.USD))
                .ForMember(item => item.PrintingEditionId, model => model.MapFrom(c => c.PrintingEditionId));
        }
    }
}
