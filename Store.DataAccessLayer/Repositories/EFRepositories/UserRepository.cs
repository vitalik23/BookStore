using Microsoft.EntityFrameworkCore;
using Store.DataAccessLayer.AppContext;
using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Models.Pagination;
using Store.DataAccessLayer.Models.User;
using Store.DataAccessLayer.Repositories.Interfaces;
using Store.Shared.Constants;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Store.DataAccessLayer.Repositories.EFRepositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {

        public UserRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task<(IEnumerable<User>, int)> GetFilteredUsersAsync(UserFilterModel model, PaginationFilterModel pagination)
        {
            var result = await _dbSet
                               .Where(user => model.UserName == null || EF.Functions.Like(user.FirstName, $"%{model.UserName}%") || EF.Functions.Like(user.LastName, $"%{model.UserName}%"))
                               .Where(user => model.IsBlocked == null || user.IsBlocked == model.IsBlocked)
                               .ToListAsync();

            int countElement = result.Count();

            result = result.Skip((pagination.PageNumber - Constants.Page.PAGE_NUMBER) * pagination.PageSize).Take(pagination.PageSize).ToList();

            (IEnumerable<User>, int) tupleResult = (result, countElement);

            return tupleResult;
        }

        public async Task<User> GetUserByIdAsync(string id)
        {
            var result = await _dbSet.FirstOrDefaultAsync(user => user.Id.Equals(id));
            return result;
        }

    }
}
