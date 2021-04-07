using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Store.BusinessLogicLayer.Services.Interfaces;
using Store.Shared.Constants;
using System.Threading.Tasks;

namespace Store.PresentationLayer.Areas.AccountAdmin.Pages
{
    public class LogoutModel : PageModel
    {
        private readonly IAccountService _accountService;

        public LogoutModel(IAccountService accountService)
        {
            _accountService = accountService;

        }

        public async Task<IActionResult> OnGet()
        {
            await _accountService.LogoutAsync();

            HttpContext.Response.Cookies.Delete(Constants.Token.ACCESS_TOKEN_NAME);
            HttpContext.Response.Cookies.Delete(Constants.Token.REFRESH_TOKEN_NAME);

            return RedirectToPage("/SignIn");
        }
    }
}
