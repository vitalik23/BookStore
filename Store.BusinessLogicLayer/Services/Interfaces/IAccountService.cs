using Store.BusinessLogicLayer.Models.Authentication;
using Store.BusinessLogicLayer.Models.Tokens;
using System.Threading.Tasks;

namespace Store.BusinessLogicLayer.Services.Interfaces
{
    public interface IAccountService
    {
        public Task<TokenResponseModel> SignInAsync(LoginModel model);
        public Task SignUpAsync(RegisterModel model);
        public Task LogoutAsync();
        public Task ForgotPasswordAsync(ForgotPasswordModel model);
        public Task ConfirmEmailAsync(ConfirmEmail model);
        public Task<TokenResponseModel> UpdateTokensAsync(TokenResponseModel model);

    }
}
