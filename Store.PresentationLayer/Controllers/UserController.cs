using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Store.BusinessLogicLayer.Models.Users;
using Store.BusinessLogicLayer.Services.Interfaces;
using Store.Shared.Constants;
using System.Threading.Tasks;

namespace Store.PresentationLayer.Controllers
{
    [Route(Constants.Routes.USER)]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize(AuthenticationSchemes = Constants.Token.BEARER)]
        [HttpGet]
        [Route(Constants.Routes.PROFILE)]
        public async Task<IActionResult> ProfileAsync()
        {
            var dataOfUser = await _userService.GetDataAboutUserAsync();
            return Ok(dataOfUser);
        }

        [Authorize(AuthenticationSchemes = Constants.Token.BEARER)]
        [HttpPost]
        [Route(Constants.Routes.UPDATE_USER)]
        public async Task<IActionResult> UpdateUserAsync(UserModel model)
        {
            await _userService.UpdateUserAsync(model);
            return Ok();
        }

    }
}
