using AutoMapper;
using Microsoft.Extensions.Options;
using Store.BusinessLogicLayer.Models.Orders;
using Store.BusinessLogicLayer.Models.OrderItems;
using Store.BusinessLogicLayer.Models.Payments;
using Store.BusinessLogicLayer.Services.Interfaces;
using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Models.Order;
using Store.DataAccessLayer.Repositories.Interfaces;
using Store.Shared.Common.Exceptions;
using Store.Shared.Constants;
using Stripe;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Store.Shared.Enums.Enums;
using System.Linq.Dynamic.Core;
using Store.Shared.Options;
using Store.DataAccessLayer.Models.Pagination;


namespace Store.BusinessLogicLayer.Services
{
    public class OrderService : IOrderService
    {
        private IOrderRepository _orderRepository;
        private IMapper _mapper;
        private IPaymentRepository _paymentRepository;
        private IUserService _userService;
        private IOrderItemService _orderItemService;
        private IOptions<StripeConnectionOptions> _connectionOptions;
        private string _key;

        public OrderService(IOrderRepository orderRepository, IMapper mapper,
                            IPaymentRepository paymentRepository, IOptions<StripeConnectionOptions> connectionOptions,
                            IUserService userService, IOrderItemService orderItemService)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
            _paymentRepository = paymentRepository;
            _connectionOptions = connectionOptions;
            _userService = userService;
            _orderItemService = orderItemService;
            _key = _connectionOptions.Value.Key;

        }

        public async Task<PagedResponse<OrderModel>> GetFilteredOrderItemsAsync(OrderFilterModel model, PaginationFilterModel pagination)
        {
            if (string.IsNullOrWhiteSpace(model.SortBy) && string.IsNullOrWhiteSpace(model.TypeSort))
            {
                model.SortBy = Constants.Sort.DefaultSortById;
                model.TypeSort = Constants.Sort.DefaultSortByAsc;
            }

            (IEnumerable<DataAccessLayer.Entities.Order> orders, int count) orders = await _orderRepository.GetFilteredOrdersAsync(model, pagination);

            var orderItemModel = _mapper.Map<IEnumerable<OrderModel>>(orders.orders);

            var pagedResponse = new PagedResponse<OrderModel> 
            {
               Data = orderItemModel,
               PageNumber = pagination.PageNumber,
               PageSize = pagination.PageSize,
               TotalItems = orders.count
            };

            return pagedResponse;
        }

        public async Task<PagedResponse<OrderModel>> GetUserOrdersAsync(PaginationFilterModel pagination)
        {
            var user = await _userService.GetUserByIdAsync();

            (IEnumerable<DataAccessLayer.Entities.Order> orders, int count) filteredOrders = await _orderRepository.GetOrdersByUserIdAsync(user.Id, pagination);

            var orders = _mapper.Map<IEnumerable<OrderModel>>(filteredOrders.orders);

            var pagedResponse = new PagedResponse<OrderModel>
            {
                Data = orders,
                PageNumber = pagination.PageNumber,
                PageSize = pagination.PageSize,
                TotalItems = filteredOrders.count
            };

            return pagedResponse;
        }

        public async Task<OrderModel> CreateOrderAsync(List<CreateOrderItemModel> model)
        {

            if (!model.Any())
            {
                throw new ServerException(Constants.Errors.EMPTY_ORDER);
            }

            var user = await _userService.GetUserByIdAsync();

            var payment = new Payment
            {
                TransactionId = null
            };

            await _paymentRepository.CreateAsync(payment);

            decimal totalAmount = default;

            model.ForEach(item =>
            {
                totalAmount += item.Amount;
            });

            var order = new DataAccessLayer.Entities.Order
            {
                Description = null,
                Status = StatusType.Unpaid,
                UserId = user.Id,
                PaymentId = payment.Id,
                TotalAmount = totalAmount
            };

            await _orderRepository.CreateAsync(order);

            await _orderItemService.CreateOrderItemAsync(order.Id, model);

            var orderModel = _mapper.Map<OrderModel>(order);

            return orderModel;
        }

        public async Task<OrderModel> PayAsync(PaymentModel model)
        {

            StripeConfiguration.ApiKey = _key;

            var card = new CreditCardOptions
            {
                Number = model.CardNumber,
                ExpMonth = model.Month,
                ExpYear = model.Year,
                Cvc = model.CVC
            };

            var optionsToken = new TokenCreateOptions
            {
                Card = card
            };

            var serviceToken = new Stripe.TokenService();
            var stripeToken = await serviceToken.CreateAsync(optionsToken);


            var options = new ChargeCreateOptions
            {
                Amount = model.Value * Constants.Numbers.CONVERT_TO_PRICE,
                Currency = CurrencyType.USD.ToString(),
                Description = model.Description,
                Source = stripeToken.Id
            };


            var service = new ChargeService();
            var charge = await service.CreateAsync(options);


            var payment = await _orderRepository.GetPaymentByOrderIdAsync(model.OrderId);
            payment.TransactionId = charge.Id;

            await _paymentRepository.UpdateAsync(payment);

            var order = await _orderRepository.GetOrderByIdAsync(model.OrderId);
            order.Description = model.Description;
            order.Status = StatusType.Paid;

            await _orderRepository.UpdateAsync(order);

            if (!charge.Paid)
            {
                throw new ServerException(Constants.Success.UNPAID_ORDER);
            }

            var orderModel = _mapper.Map<OrderModel>(order);

            return orderModel;

        }

    }
}
