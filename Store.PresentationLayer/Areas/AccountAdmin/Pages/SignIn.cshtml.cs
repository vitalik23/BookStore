
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Store.BusinessLogicLayer.Models.Authentication;
using Store.BusinessLogicLayer.Services.Interfaces;
using Store.Shared.Constants;
using System.Threading.Tasks;

namespace Store.PresentationLayer.Areas.AccountAdmin.Pages
{
    public class SignInModel : PageModel
    {
        [BindProperty]
        public LoginModel LoginModel { get; set; }

        private readonly IAccountService _accountService;

        public SignInModel(IAccountService accountService)
        {
            _accountService = accountService;

        }
       
        public IActionResult OnGet()
        {
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            var tokens = await _accountService.SignInAsync(LoginModel);

            HttpContext.Response.Cookies.Append(Constants.Token.ACCESS_TOKEN_NAME, tokens.AccessToken);
            HttpContext.Response.Cookies.Append(Constants.Token.REFRESH_TOKEN_NAME, tokens.RefreshToken);

            return Redirect("~/Home/MainPage");
        }
    }
}
