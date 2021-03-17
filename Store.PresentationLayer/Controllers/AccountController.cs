using Microsoft.AspNetCore.Mvc;
using Store.BusinessLogicLayer.Models.Authentication;
using Store.BusinessLogicLayer.Models.Tokens;
using Store.BusinessLogicLayer.Services.Interfaces;
using Store.Shared.Constants;
using System.Threading.Tasks;

namespace Store.PresentationLayer.Controllers
{

    [Route(Constants.Routes.ACCOUNT)]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost]
        [Route(Constants.Routes.SIGN_IN)]
        public async Task<IActionResult> SignInAsync(LoginModel model)
        {
            var tokens = await _accountService.SignInAsync(model);
            return Ok(tokens);
        }
        

        [HttpPost]
        [Route(Constants.Routes.SIGN_UP)]
        [Produces(Constants.Attribute.PRODUCES)]
        public async Task<IActionResult> SignUpAsync( RegisterModel model)
        {
            await _accountService.SignUpAsync(model);

            return Ok(Constants.Success.SUCCESSFULLY_REGISTERED);
        }

        [HttpPost]
        [Route(Constants.Routes.CONFIRM_EMAIL)]
        public async Task<IActionResult> ConfirmEmailAsync(ConfirmEmail model)
        {
            await _accountService.ConfirmEmailAsync(model);
            return Ok();
        }

        [HttpGet]
        [Route(Constants.Routes.SIGN_OUT)]
        public async Task<IActionResult> SignOutAsync()
        {
            await _accountService.LogoutAsync();
            return Ok();
        }

        [HttpPost]
        [Route(Constants.Routes.FORGOT_PASSWORD)]
        [Produces(Constants.Attribute.PRODUCES)]
        public async Task<IActionResult> ForgotPasswordAsync(ForgotPasswordModel model)
        {
            await _accountService.ForgotPasswordAsync(model);
            return Ok(Constants.Success.FORGOT_PASSWORD);
        }

        [HttpPost]
        [Route(Constants.Routes.UPDATE_TOKENS)]
        public async Task<IActionResult> UpdateTokensAsync(TokenResponseModel model)
        {
            var newTokens = await _accountService.UpdateTokensAsync(model);
            return Ok(newTokens);
        }

    }
}
