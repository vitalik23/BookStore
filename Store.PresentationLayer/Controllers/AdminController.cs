using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Store.BusinessLogicLayer.Models.Users;
using Store.BusinessLogicLayer.Services.Interfaces;
using Store.Shared.Constants;

namespace Store.PresentationLayer.Controllers
{
    [Route(Constants.Routes.ADMIN)]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private IUserService _userService;
        private IAdminService _adminService;
        private IAuthorService _authorService;

        public AdminController(IUserService userService, IAdminService adminService,
                               IAuthorService authorService)
        {
            _userService = userService;
            _adminService = adminService;
            _authorService = authorService;
        }

        [Authorize(Roles = Constants.AuthRoles.ADMIN_ROLE, AuthenticationSchemes = Constants.Token.BEARER)]
        [HttpGet]
        [Route(Constants.Routes.DELETE_USER + Constants.Routes.ID)]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            await _userService.DeleteUserAsync(id);
            return Ok();
        }

        [Authorize(Roles = Constants.AuthRoles.ADMIN_ROLE, AuthenticationSchemes = Constants.Token.BEARER)]
        [HttpPost]
        [Route(Constants.Routes.GET_USERS)]
        public async Task<IActionResult> GetUsersAsync(UserFilterAndPaginationModel model)
        {
            var users = await _userService.GetFilteredUsersAsync(model.UserFilterModels, model.PaginationFilterModel);
            return Ok(users);
        }

        [Authorize(Roles = Constants.AuthRoles.ADMIN_ROLE, AuthenticationSchemes = Constants.Token.BEARER)]
        [HttpGet]
        [Route(Constants.Routes.BLOCKE_USER + Constants.Routes.ID)]
        public async Task<IActionResult> LockeUserAsync(string id)
        {
            await _userService.ChangeStatusUserAsync(id);
            return Ok();
        }

        [Authorize(Roles = Constants.AuthRoles.ADMIN_ROLE, AuthenticationSchemes = Constants.Token.BEARER)]
        [HttpPost]
        [Route(Constants.Routes.UPDATE_USER_ADMIN)]
        public async Task<IActionResult> UpdateUserAdminAsync(UserModel model)
        {
            var user = await _adminService.UpdateUserAsync(model);
            return Ok(user);
        }

        [Authorize(Roles = Constants.AuthRoles.ADMIN_ROLE, AuthenticationSchemes = Constants.Token.BEARER)]
        [HttpGet]
        [Route(Constants.Routes.GET_ALL_AUTHORS)]
        public async Task<IActionResult> GetAllAuthorsAsync()
        {
            var allUsers = await _authorService.GetAllAuthorsAsync();
            return Ok(allUsers);
        }

    }
}
