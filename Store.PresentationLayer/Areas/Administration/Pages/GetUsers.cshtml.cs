using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Store.BusinessLogicLayer.Models.Users;
using Store.BusinessLogicLayer.Services.Interfaces;
using Store.DataAccessLayer.Models.Pagination;
using System.Threading.Tasks;
using Store.DataAccessLayer.Models.User;
using Microsoft.AspNetCore.Authorization;
using System;
using Store.Shared.Constants;

namespace Store.PresentationLayer.Areas.Administration.Pages
{
    [Authorize]
    public class GetUsersModel : PageModel
    {
        private IUserService _userService;

        public GetUsersModel(IUserService userService)
        {
            _userService = userService;
        }

        public PagedResponse<UserModel> PagedPesponse { get; set; }

        [BindProperty]
        public UserFilterAndPaginationModel UserFilterAndPaginationModel { get; set; }

        public async Task<IActionResult> OnGetAsync()
        {
            var userFilter = new UserFilterAndPaginationModel
            {
                PaginationFilterModel = new PaginationFilterModel(),
                UserFilterModels = new UserFilterModel()
            };

            PagedPesponse = await _userService.GetFilteredUsersAsync(userFilter.UserFilterModels, userFilter.PaginationFilterModel);

            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            var nextPage = Request.Form[Constants.Shared.NEXT_PAGE];
            if (!string.IsNullOrWhiteSpace(nextPage))
            {
                int number = Convert.ToInt32(nextPage);
                UserFilterAndPaginationModel.PaginationFilterModel.PageNumber += number;
            }

            var previousPage = Request.Form[Constants.Shared.PREVIOUS_PAGE];
            if (!string.IsNullOrWhiteSpace(previousPage))
            {
                int number = Convert.ToInt32(previousPage);
                UserFilterAndPaginationModel.PaginationFilterModel.PageNumber -= number;
            }

            PagedPesponse = await _userService.GetFilteredUsersAsync(UserFilterAndPaginationModel.UserFilterModels, UserFilterAndPaginationModel.PaginationFilterModel);
            return Page();
        }

        public async Task<IActionResult> OnPostChangeStatusAsync(string id)
        {
            await _userService.ChangeStatusUserAsync(id);
            return RedirectToPage("GetUsers");
        }

        public async Task<IActionResult> OnPostDeleteAsync(string id)
        {
            await _userService.DeleteUserAsync(id);

            return RedirectToPage("GetUsers");
        }

    }
}
