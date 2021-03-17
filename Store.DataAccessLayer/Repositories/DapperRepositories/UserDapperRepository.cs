using Dapper;
using Dapper.Contrib.Extensions;
using Microsoft.Extensions.Options;
using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Models.Pagination;
using Store.DataAccessLayer.Models.User;
using Store.DataAccessLayer.Repositories.Interfaces;
using Store.Shared.Constants;
using Store.Shared.Options;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.DataAccessLayer.Repositories.DapperRepositories
{
    public class UserDapperRepository : BaseDapperRepository<User>, IUserRepository
    {

        public UserDapperRepository(IOptions<StringConnectionOptions> _connectionOptions) : base(_connectionOptions)
        {

        }


        public async Task<(IEnumerable<User>, int)> GetFilteredUsersAsync(UserFilterModel model, PaginationFilterModel pagination)
        {
            using (var connection = CreateConnection())
            {
                var sql = new StringBuilder();
                sql.Append($"SELECT * FROM AspNetUsers");
                sql.Append($" WHERE ((@UserName = '' OR @UserName = null) OR FirstName LIKE @UserName )");
                sql.Append($" AND ((@UserName = '' OR @UserName = null) OR LastName LIKE @UserName )");
                sql.Append($" AND ((@IsBlocked IS NULL OR @IsBlocked = '') OR IsBlocked = @IsBlocked) ");

                var result = await connection.QueryAsync<User>(sql.ToString(), new { UserName = $"%{model.UserName}%",
                                                                                     IsBlocked = model.IsBlocked    });

                int countElement = result.Count();

                result = result.Skip((pagination.PageNumber - Constants.Page.PAGE_NUMBER) * pagination.PageSize).Take(pagination.PageSize);

                (IEnumerable<User>, int) tupleResult = (result, countElement);

                return tupleResult;

            }
        }
        

        public async Task<User> GetUserByIdAsync(string id)
        {
            using (var connection = CreateConnection())
            {
                var result = await connection.GetAsync<User>(id);
                return result;
            }
        }

    }
}
