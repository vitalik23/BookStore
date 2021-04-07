using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Store.BusinessLogicLayer.Models.Users;
using Store.BusinessLogicLayer.Services.Interfaces;
using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Repositories.Interfaces;
using Store.Shared.Common.Exceptions;
using Store.Shared.Constants;
using System.Threading.Tasks;

namespace Store.BusinessLogicLayer.Services
{
    public class AdminService : IAdminService
    {
        private IUserRepository _userRepository;
        private UserManager<User> _userManager;
        private IMapper _imapper;


        public AdminService(IUserRepository userRepository, UserManager<User> userManager,
                            IMapper imapper)
        {
            _userRepository = userRepository;
            _userManager = userManager;
            _imapper = imapper;
        }
        public async Task<UserModel> UpdateUserAsync(UserModel model)
        {
            var user = await _userManager.FindByIdAsync(model.Id);

            if (user is null)
            {
                throw new ServerException(Constants.Errors.USER_NOT_FOUND);
            }

            if (!string.IsNullOrWhiteSpace(model.Email))
            {
                user.Email = model.Email;
            }

            if (!string.IsNullOrWhiteSpace(model.FirstName))
            {
                user.FirstName = model.FirstName;
            }

            if (!string.IsNullOrWhiteSpace(model.LastName))
            {
                user.LastName = model.LastName;
            }

            if (!string.IsNullOrWhiteSpace(model.Password))
            {
                await _userManager.RemovePasswordAsync(user);
                await _userManager.AddPasswordAsync(user, model.Password);
            }

            await _userRepository.UpdateAsync(user);

            var userModel = _imapper.Map<UserModel>(user);

            return userModel;
        }
    }
}
