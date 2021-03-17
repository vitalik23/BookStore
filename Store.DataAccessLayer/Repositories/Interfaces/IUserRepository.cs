using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Models.Pagination;
using Store.DataAccessLayer.Models.User;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Store.DataAccessLayer.Repositories.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        public Task<User> GetUserByIdAsync(string id);
        public Task<(IEnumerable<User>, int)> GetFilteredUsersAsync(UserFilterModel model, PaginationFilterModel pagination);
    }
}
