using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Store.BusinessLogicLayer.Models.Order;
using Store.BusinessLogicLayer.Models.Orders;
using Store.BusinessLogicLayer.Services.Interfaces;
using Store.DataAccessLayer.Models.Order;
using Store.DataAccessLayer.Models.Pagination;
using Store.Shared.Constants;

namespace Store.PresentationLayer.Areas.Administration.Pages
{
    [Authorize]
    public class GetOrdersModel : PageModel
    {
        private IOrderService _orderService;

        public GetOrdersModel(IOrderService orderService)
        {
            _orderService = orderService;
        }

        public PagedResponse<OrderModel> PagedPesponse { get; set; }

        [BindProperty]
        public OrderFilterAndPaginationModel OrderFilterAndPaginationModel { get; set; }

        public async Task<IActionResult> OnGetAsync()
        {
            var ordersAndPagination = new OrderFilterAndPaginationModel
            {
                OrderFilterModels = new OrderFilterModel(),
                PaginationFilterModels = new PaginationFilterModel()
            };

            PagedPesponse = await _orderService.GetFilteredOrderItemsAsync(ordersAndPagination.OrderFilterModels, ordersAndPagination.PaginationFilterModels);
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            var nextPage = Request.Form[Constants.Shared.NEXT_PAGE];
            if (!string.IsNullOrWhiteSpace(nextPage))
            {
                int number = Convert.ToInt32(nextPage);
                OrderFilterAndPaginationModel.PaginationFilterModels.PageNumber += number;
            }

            var previousPage = Request.Form[Constants.Shared.PREVIOUS_PAGE];
            if (!string.IsNullOrWhiteSpace(previousPage))
            {
                int number = Convert.ToInt32(previousPage);
                OrderFilterAndPaginationModel.PaginationFilterModels.PageNumber -= number;
            }

            PagedPesponse = await _orderService.GetFilteredOrderItemsAsync(OrderFilterAndPaginationModel.OrderFilterModels, OrderFilterAndPaginationModel.PaginationFilterModels);

            return Page();
        }

    }
}
