using Dapper;
using Microsoft.Extensions.Options;
using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Models.Author;
using Store.DataAccessLayer.Models.Pagination;
using Store.DataAccessLayer.Repositories.Interfaces;
using Store.Shared.Constants;
using Store.Shared.Options;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.DataAccessLayer.Repositories.DapperRepositories
{
    public class AuthorDapperRepository : BaseDapperRepository<Author>, IAuthorRepository
    {

        public AuthorDapperRepository(IOptions<StringConnectionOptions> _connectionOptions) : base(_connectionOptions)
        {  

        }

        public async Task<Author> GetAuthorByNameAsync(string name)
        {
            using (var connection = CreateConnection())
            {
                var result = await connection.QueryFirstOrDefaultAsync<Author>($"SELECT * FROM Authors WHERE Name=@name", new { Name = name });
                return result;
            }
        }

        public async Task<(IEnumerable<Author>, int)> GetFilteredAuthorsAsync(AuthorFilterModel model, PaginationFilterModel pagination)
        {
            using (var connection = CreateConnection())
            {
                var sql = new StringBuilder();
                sql.Append("SELECT author.Id, author.Name, pe.*");
                sql.Append($" FROM Authors as author");
                sql.Append($" INNER JOIN AuthorInPrintingEditions as auInpe on author.Id = auInpe.AuthorId");
                sql.Append($" INNER JOIN PrintingEditions as pe on pe.Id = auInpe.PrintingEditionId");
                sql.Append($" WHERE ((@Name = '' OR @Name = null) OR Name LIKE @Name )");

                var authors = await connection.QueryAsync<Author, PrintingEdition, Author>(sql.ToString(),
                    (author, printingEdition) =>
                    {
                        author.AuthorInPrintingEdition.Add(new AuthorInPrintingEdition { PrintingEdition = printingEdition });
                        return author;
                    },
                    new { Name = $"%{model.Name}%" },
                    splitOn: "Id");


                var groupedAuthors = authors.GroupBy(author => author.Id).Select(groupAuthor =>
                {
                    var groupedAuthor = groupAuthor.First();
                    groupedAuthor.AuthorInPrintingEdition = groupAuthor.Select(author => author.AuthorInPrintingEdition.FirstOrDefault()).ToList();
                    return groupedAuthor;
                });

                int countElement = authors.Count();

                groupedAuthors = groupedAuthors.Skip((pagination.PageNumber - Constants.Page.PAGE_NUMBER) * pagination.PageSize).Take(pagination.PageSize).ToList();

                (IEnumerable<Author>, int) tupleResult = (groupedAuthors, countElement);

                return tupleResult;

            }
        }

    }
}
