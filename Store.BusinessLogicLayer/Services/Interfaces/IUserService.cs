using Microsoft.AspNetCore.Identity;
using Store.BusinessLogicLayer.Models.Authentication;
using Store.BusinessLogicLayer.Models.Users;
using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Models.Pagination;
using Store.DataAccessLayer.Models.User;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Store.BusinessLogicLayer.Services.Interfaces
{
    public interface IUserService
    {
        public Task<IEnumerable<IdentityRole>> GetAllRolesAsync();
        public Task CreateRolesAsync(string roleName);
        public Task DeleteRolesAsync(string id);
        public Task<bool> CheckIsRoleExistsAsync(string name);
        public Task<IList<string>> GetUserRolesAsync(User user);
        public Task<User> FindByEmailAsync(string email);
        public Task DeleteUserAsync(string id);
        public Task CreateUserAsync(RegisterModel model);
        public Task UpdateUserAsync(UserModel model);
        public Task<UserModel> GetDataAboutUserAsync();
        public Task<User> GetUserByIdAsync();
        public Task<PagedResponse<UserModel>> GetFilteredUsersAsync(UserFilterModel model, PaginationFilterModel pagination);
        public Task ChangeStatusUserAsync(string id);
    }
}
