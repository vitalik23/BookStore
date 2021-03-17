using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Store.BusinessLogicLayer.Models.Authentication;
using Store.BusinessLogicLayer.Models.Users;
using Store.BusinessLogicLayer.Services.Interfaces;
using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Models.Pagination;
using Store.DataAccessLayer.Models.User;
using Store.DataAccessLayer.Repositories.Interfaces;
using Store.Shared.Common.Exceptions;
using Store.Shared.Constants;
using Store.Shared.Enums;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Store.BusinessLogicLayer.Services
{
    public class UserService : IUserService
    {
        private RoleManager<IdentityRole> _roleManager;
        private UserManager<User> _userManager;
        private IUserRepository _userRepository;
        private IHttpContextAccessor _httpContextAccessor;
        private IMapper _autoMapper; 


        public UserService(RoleManager<IdentityRole> roleManager, UserManager<User> userManager,
                            IUserRepository userRepository,
                            IHttpContextAccessor httpContextAccessor,
                            IMapper autoMapper)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
            _autoMapper = autoMapper;
        }

        public async Task<bool> CheckIsRoleExistsAsync(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ServerException(Constants.Errors.NAME_IS_EMPTY);
            }

            bool roleExist = await _roleManager.RoleExistsAsync(name);

            return roleExist;
        }     

        public async Task CreateRolesAsync(string roleName)
        {
            if (string.IsNullOrWhiteSpace(roleName))
            {
                throw new ServerException(Constants.Errors.ROLE_IS_NOT_EXISTS);
            }
            await _roleManager.CreateAsync(new IdentityRole(roleName));
        }

        public async Task DeleteRolesAsync(string id)
        {
            var role = await _roleManager.FindByIdAsync(id);
            if (role is null)
            {
                throw new ServerException(Constants.Errors.ROLE_IS_NOT_EXISTS);
            }
            await _roleManager.DeleteAsync(role);
        }

        public async Task<IEnumerable<IdentityRole>> GetAllRolesAsync()
        {
            var allRoles = await _roleManager.Roles.ToListAsync();
            return allRoles;
        }

        public async Task<IList<string>> GetUserRolesAsync(User user)
        {
            var userRoles = await _userManager.GetRolesAsync(user);
            return userRoles;
        }

        public async Task DeleteUserAsync(string id) 
        {
            var user = await _userManager.FindByIdAsync(id);
            if(user is null)
            {
                throw new ServerException(Constants.Errors.USER_NOT_FOUND);
            }

            await _userManager.DeleteAsync(user);
        }

        public async Task CreateUserAsync(RegisterModel model)
        {
            List<string> errors = new List<string>();

            if (string.IsNullOrWhiteSpace(model.FirstName))
            {
                errors.Add(Constants.Errors.FIRST_NAME_IS_REQUIRED);
            }

            if (string.IsNullOrWhiteSpace(model.LastName))
            {
                errors.Add(Constants.Errors.LAST_NAME_IS_REQUIRED);
            }

            if (string.IsNullOrWhiteSpace(model.Email))
            {
                errors.Add(Constants.Errors.EMAIL_IS_REQUIRED);
            }

            if (string.IsNullOrWhiteSpace(model.Password))
            {
                errors.Add(Constants.Errors.PASSWORD_IS_REQUIRED);
            }

            if (string.IsNullOrWhiteSpace(model.Password))
            {
                errors.Add(Constants.Errors.PASSWORD_NOT_MATCH);
            }

            if (errors.Any())
            {
                throw new ServerException(errors);
            }

            var existingUser = await _userManager.FindByEmailAsync(model.Email);

            if (existingUser is not null)
            {
                throw new ServerException(Constants.Errors.USER_ALREADY_EXISTS);
            }

            var user = _autoMapper.Map<User>(model);

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                throw new ServerException(Constants.Errors.USER_NOT_REGISTERED);
            }

            var addToRole = await _userManager.AddToRoleAsync(user, Enums.UserRoles.Client.ToString());

            if (!addToRole.Succeeded)
            {
                throw new ServerException(Constants.Errors.USER_NOT_ADDED_TO_ROLE);
            }
        }

        public async Task UpdateUserAsync(UserModel model)
        {
            var user = await GetUserByIdAsync();

            if (user is null)
            {
                throw new ServerException(Constants.Errors.USER_NOT_FOUND);
            }

            if (!model.Password.Equals(model.PasswordConfirm))
            {
                throw new ServerException(Constants.Errors.PASSWORD_NOT_MATCH);
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
            if (!string.IsNullOrWhiteSpace(model.Password) && !string.IsNullOrWhiteSpace(model.CurrentPassword))
            {
                var resutl = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.Password);
                if (!resutl.Succeeded)
                {
                    throw new ServerException(Constants.Errors.PASSWORD_NOT_CHANGED);
                }
            }

            await _userRepository.UpdateAsync(user);
        }

        public async Task ChangeStatusUserAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user is null)
            {
                throw new ServerException(Constants.Errors.USER_NOT_FOUND);
            }

            user.IsBlocked = !user.IsBlocked;

            await _userManager.UpdateAsync(user);
        }

        public async Task<UserModel> GetDataAboutUserAsync()
        {
            var user = await GetUserByIdAsync();

            if (user is null)
            {
                throw new ServerException(Constants.Errors.USER_NOT_FOUND);
            }

            var userModel = new UserModel
            {
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Id = user.Id
            };

            return userModel;
        }

        public async Task<User> FindByEmailAsync(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                throw new ServerException(Constants.Errors.EMAIL_IS_EMPTY);
            }

            var user = await _userManager.FindByEmailAsync(email);

            return user;
        }

        public async Task<User> GetUserByIdAsync()
        {
            var user = await _userRepository.GetUserByIdAsync(_httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return user;
        }

        public async Task<PagedResponse<UserModel>> GetFilteredUsersAsync(UserFilterModel model, PaginationFilterModel pagination)
        {

            (IEnumerable<User> users, int count) users = await _userRepository.GetFilteredUsersAsync(model, pagination);

            var userModel = _autoMapper.Map<IEnumerable<UserModel>>(users.users);

            var pagedResponse = new PagedResponse<UserModel>
            {
                Data = userModel,
                PageNumber = pagination.PageNumber,
                PageSize = pagination.PageSize,
                TotalItems = users.count
            };

            return pagedResponse;

        }
    }
}
 