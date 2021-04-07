using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Store.BusinessLogicLayer.Models.Order;
using Store.BusinessLogicLayer.Models.OrderItems;
using Store.BusinessLogicLayer.Models.Payments;
using Store.BusinessLogicLayer.Services.Interfaces;
using Store.DataAccessLayer.Models.Pagination;
using Store.Shared.Constants;

namespace Store.PresentationLayer.Controllers
{
    [Route(Constants.Routes.ORDER)]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [Authorize(AuthenticationSchemes = Constants.Token.BEARER)]
        [HttpPost]
        [Route(Constants.Routes.GET_ORDERS)]
        public async Task<IActionResult> GetOrderAsync(OrderFilterAndPaginationModel model)
        {
            var orders = await _orderService.GetFilteredOrderItemsAsync(model.OrderFilterModels, model.PaginationFilterModels);
            return Ok(orders);
        }

        [Authorize(Roles = Constants.AuthRoles.CLIENT_ROLE, AuthenticationSchemes = Constants.Token.BEARER)]
        [HttpPost]
        [Route(Constants.Routes.BUY_ORDER)]
        public async Task<IActionResult> BuyAsync(PaymentModel model)
        {
            var order = await _orderService.PayAsync(model);
            return Ok(order);
        }

        [Authorize(Roles = Constants.AuthRoles.CLIENT_ROLE, AuthenticationSchemes = Constants.Token.BEARER)]
        [HttpPost]
        [Route(Constants.Routes.CREATE_ORDER)]
        public async Task<IActionResult> CreateOrderAsync(List<CreateOrderItemModel> model)
        {
            var order = await _orderService.CreateOrderAsync(model);
            return Ok(order);
        }

        [Authorize(Roles = Constants.AuthRoles.CLIENT_ROLE, AuthenticationSchemes = Constants.Token.BEARER)]
        [HttpPost]
        [Route(Constants.Routes.GET_USER_ORDERS)]
        public async Task<IActionResult> GetUserOrdersAsync(PaginationFilterModel pagination)
        {
            var userOrders = await _orderService.GetUserOrdersAsync(pagination);
            return Ok(userOrders);
        }
    }
}
