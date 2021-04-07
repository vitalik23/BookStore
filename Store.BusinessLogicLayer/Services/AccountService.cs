using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;
using Store.BusinessLogicLayer.Models.Authentication;
using Store.BusinessLogicLayer.Models.Tokens;
using Store.BusinessLogicLayer.Providers;
using Store.BusinessLogicLayer.Services.Interfaces;
using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Repositories.Interfaces;
using Store.Shared.Common.Exceptions;
using Store.Shared.Constants;
using Store.Shared.Options;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.BusinessLogicLayer.Services
{
    public class AccountService : IAccountService
    {
        private UserManager<User> _userManager;
        private IUserService _userService;
        private SignInManager<User> _signInManager;
        private GeneratePasswordProvider _generatePassword;
        private EmailProvider _emailProvider;
        private IUserRepository _userRepository;
        private JwtProvider _jwtProvider;
        private IOptions<ClientConnectionOptions> _connectionOptions;
        private string _localhost;
        private string _path;

        public AccountService(UserManager<User> userManager, IUserService userService, 
                            SignInManager<User> signInManager, GeneratePasswordProvider generatePassword,
                            IOptions<ClientConnectionOptions> connectionOptions,
                            EmailProvider emailProvider,
                            IUserRepository userRepository, JwtProvider jwtProvider)
        {
            _userManager = userManager;
            _userService = userService;
            _signInManager = signInManager;
            _generatePassword = generatePassword;
            _emailProvider = emailProvider;
            _userRepository = userRepository;
            _jwtProvider = jwtProvider;
            _connectionOptions = connectionOptions;
            _localhost = _connectionOptions.Value.Localhost;
            _path = _connectionOptions.Value.Path;
        }

        public async Task<TokenResponseModel> SignInAsync(LoginModel model)
        {
            List<string> errors = new List<string>();

            if (string.IsNullOrWhiteSpace(model.Email))
            {
                errors.Add(Constants.Errors.EMAIL_IS_REQUIRED);
            }

            if (string.IsNullOrWhiteSpace(model.Password))
            {
                errors.Add(Constants.Errors.PASSWORD_IS_REQUIRED);
            }

            if (errors.Any())
            {
                throw new ServerException(errors);
            }

            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user is null)
            {
                throw new ServerException(Constants.Errors.USER_NOT_EXISTS);
            }

            if (!user.EmailConfirmed)
            {
                throw new ServerException(Constants.Errors.NOT_CONFIRMED_EMAIL);
            }

            if (user.IsBlocked)
            {
                throw new ServerException(Constants.Errors.USER_IS_BLOCKED);
            }

            if(!await _userManager.CheckPasswordAsync(user, model.Password))
            {
                throw new ServerException(Constants.Errors.INVALID_PASSWORD);
            }

            var claims = await _jwtProvider.GetUserClaimsAsync(user.Email);
            string accessToken = _jwtProvider.GenerateAccessToken(claims);
            string refreshToken = _jwtProvider.GenerateRefreshToken();

            user.RefreshToken = refreshToken;

            await _userRepository.UpdateAsync(user);

            var tokens = new TokenResponseModel
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };

            return tokens;

        }

        public async Task SignUpAsync(RegisterModel model)
        {
            await _userService.CreateUserAsync(model);
            await SendMessageToEmailAsync(model);
        }

        public async Task LogoutAsync()
        {
            var user = await _userService.GetUserByIdAsync();
            user.RefreshToken = null;
            await _userRepository.UpdateAsync(user);

            await _signInManager.SignOutAsync();
        }

        public async Task ForgotPasswordAsync(ForgotPasswordModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Email))
            {
                throw new ServerException(Constants.Errors.EMAIL_IS_REQUIRED);
            }

            var user = await _userService.FindByEmailAsync(model.Email);

            if (user is null)
            {
                throw new ServerException(Constants.Errors.USER_NOT_FOUND);
            }

            string passwordReset = _generatePassword.GeneratePassword();

            await _userManager.RemovePasswordAsync(user);
            await _userManager.AddPasswordAsync(user, passwordReset);

            await _userManager.UpdateAsync(user);

            await _emailProvider.SendEmailAsync(model.Email, Constants.Success.NEW_PASSWORD,
                $"{Constants.Success.NEW_PASSWORD}: {passwordReset}");

        }

        public async Task ConfirmEmailAsync(ConfirmEmail model)
        {
            if (string.IsNullOrWhiteSpace(model.Email) || string.IsNullOrWhiteSpace(model.Code))
            {
                throw new ServerException(Constants.Errors.USER_NOT_FOUND);
            }
            var user = await _userManager.FindByEmailAsync(model.Email);

            byte[] codeDecodeBytes = WebEncoders.Base64UrlDecode(model.Code);
            string codeDecoded = Encoding.UTF8.GetString(codeDecodeBytes);

            var result = await _userManager.ConfirmEmailAsync(user, codeDecoded);
            if (!result.Succeeded)
            {
                throw new ServerException(Constants.Errors.NOT_CONFIRMED_EMAIL);
            }

            await _userManager.UpdateAsync(user);

        }     

        public async Task<TokenResponseModel> UpdateTokensAsync(TokenResponseModel model)
        {
            if(model is null)
            {
                throw new ServerException(Constants.Errors.INVALID_CLIENT_REQUEST);
            }

            string refreshToken = model.RefreshToken;

            var principal = _jwtProvider.ValidateToken(model.AccessToken);
            string userName = principal.Identity.Name;

            var user = await _userManager.FindByNameAsync(userName);

            if(userName is null || !user.RefreshToken.Equals(refreshToken) )
            {
                throw new ServerException(Constants.Errors.PLEASE_LOGIN);
            }

            string newAccessToken = _jwtProvider.GenerateAccessToken(principal.Claims);
            string newRefreshToken = _jwtProvider.GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            await _userRepository.UpdateAsync(user);

            var newTokens = new TokenResponseModel
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            };

            return newTokens;

        }

        private async Task SendMessageToEmailAsync(RegisterModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            string code = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            byte[] tokenGenerateBytes = Encoding.UTF8.GetBytes(code);
            string tokenCode = WebEncoders.Base64UrlEncode(tokenGenerateBytes);

            var callbackUrl = new StringBuilder();
            callbackUrl.Append($"{_localhost}{_path}");
            callbackUrl.Append($"{Constants.Shared.PARAM_EMAIL}{model.Email}{Constants.Shared.PARAM_CODE}{tokenCode}");

            await _emailProvider.SendEmailAsync(model.Email, Constants.Success.CONFIRM_EMAIL,
                $"{Constants.Success.CONFIRM_REGISTRATION} {Constants.Shared.OPEN_TAG_LINK}{callbackUrl}{Constants.Shared.CLOSE_TAG_LINK}");
        }

    }
}
