using Dapper;
using Microsoft.Extensions.Options;
using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Repositories.Interfaces;
using Store.Shared.Options;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Store.DataAccessLayer.Repositories.DapperRepositories
{
    public class AuthorInPrintingEditionDapperRepository : BaseDapperRepository<AuthorInPrintingEdition>, IAuthorInPrintingEditionRepository
    {

        public AuthorInPrintingEditionDapperRepository(IOptions<StringConnectionOptions> _connectionOptions) : base(_connectionOptions)
        {

        }

        public async Task AddAuthorToPrintingEditionAsync(List<long> authorsId, long printingEdId)
        {
            var authorInprinting = new List<AuthorInPrintingEdition>();

            authorsId.ForEach(authorId => authorInprinting.Add(new AuthorInPrintingEdition
            {
                AuthorId = authorId,
                PrintingEditionId = printingEdId
            }));

            await AddRangeAsync(authorInprinting);
        }

        public async Task<List<long>> GetAuthorsIdOfPrintingEditionAsync(long printingEditionId)
        {

            string sql = $"SELECT AuthorId FROM AuthorInPrintingEditions  WHERE PrintingEditionId = @printingEditionId";

            using (var connection = CreateConnection())
            {
                var authorsId = await connection.QueryAsync<long>(sql, new { PrintingEditionId = printingEditionId });

                var result = authorsId.ToList();

                return result;
            }
        }

    }
}
