using Dapper;
using Dapper.Contrib.Extensions;
using Microsoft.Extensions.Options;
using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Models.Pagination;
using Store.DataAccessLayer.Models.PrintingEdition;
using Store.DataAccessLayer.Repositories.Interfaces;
using Store.Shared.Constants;
using Store.Shared.Options;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.DataAccessLayer.Repositories.DapperRepositories
{
    public class PrintingEditionDapperRepository : BaseDapperRepository<PrintingEdition>, IPrintingEditionRepository
    {
        public PrintingEditionDapperRepository(IOptions<StringConnectionOptions> _connectionOptions) : base(_connectionOptions)
        {

        }

        
        public async Task<(IEnumerable<PrintingEdition>, int)> GetFilteredPrintingEditionsAsync(PrintingEditionFilterModel model, PaginationFilterModel pagination)
        {

            using (var connection = CreateConnection())
            {
                var categories = new StringBuilder();

                if (model.Category is not null)
                {
                    foreach (var item in model.Category)
                    {
                        categories.Append($"'{(int)item}'");
                        categories.Append(",");
                    }

                    categories.Remove(categories.Length - Constants.Numbers.COUNT_ELEMENT_DELETE, Constants.Numbers.COUNT_ELEMENT_DELETE);
                }

                if(model.Category is null)
                {
                    categories.Append("''");
                }

                var sql = new StringBuilder();
                sql.Append("SELECT pe.*, author.*");
                sql.Append($" FROM PrintingEditions as pe");
                sql.Append($" INNER JOIN AuthorInPrintingEditions as auInpe on pe.Id = auInpe.PrintingEditionId");
                sql.Append($" INNER JOIN Authors as author on author.Id = auInpe.AuthorId");
                sql.Append($" WHERE (('{model.Category}' = '' OR '{model.Category}' = null) OR pe.Type IN ({categories}))");
                sql.Append($" AND ((@PrintingEditionName = '' OR @PrintingEditionName = null) OR pe.Title LIKE @PrintingEditionName) ");
                sql.Append($" AND ((@MinPrice IS NULL OR @MaxPrice IS NULL ) ");
                sql.Append($" OR ((pe.Price >= @MinPrice) AND (pe.Price <= @MaxPrice)) ) ");
                sql.Append($" AND ( (@AuthorName = '' OR @AuthorName = null) OR author.Name LIKE @AuthorName  )");


                var printingEditions = await connection.QueryAsync<PrintingEdition, Author, PrintingEdition>(sql.ToString(),
                    (printingEdition, author) =>
                    {
                        printingEdition.AuthorInPrintingEdition.Add(new AuthorInPrintingEdition { Author = author });
                        return printingEdition;
                    },
                    new
                    {
                        PrintingEditionName = $"%{model.PrintingEditionName}%",
                        MinPrice = model.MinPrice,
                        MaxPrice = model.MaxPrice,
                        AuthorName = $"%{model.AuthorName}%"
                    },
                    splitOn: "Id");

                var groupedAuthors = printingEditions.GroupBy(printingEdition => printingEdition.Id).Select(groupPrintingEdition =>
                {
                    var groupedAuthor = groupPrintingEdition.First();
                    groupedAuthor.AuthorInPrintingEdition = groupPrintingEdition.Select(printingEdition => printingEdition.AuthorInPrintingEdition.FirstOrDefault()).ToList();
                    return groupedAuthor;
                });

                int countElement = printingEditions.Count();

                groupedAuthors = groupedAuthors.Skip((pagination.PageNumber - Constants.Page.PAGE_NUMBER) * pagination.PageSize).Take(pagination.PageSize).ToList();

                (IEnumerable<PrintingEdition>, int) tupleResult = (groupedAuthors, countElement);

                return tupleResult;

            }
        }

        public async Task<decimal> GetMaxPricePrintingEditionAsync()
        {
            using (var connection = CreateConnection())
            {
                decimal result = await connection.QueryFirstOrDefaultAsync<decimal>($"SELECT MAX(Price) FROM PrintingEditions");
                return result;
            }
        }

        public async Task<PrintingEdition> GetPrintingEditionByIdAsync(long id)
        {
            var sql = new StringBuilder();
            sql.Append($"SELECT pe.*,  author.*  FROM PrintingEditions as pe");
            sql.Append($" INNER JOIN AuthorInPrintingEditions as auInpe on pe.Id = auInpe.PrintingEditionId");
            sql.Append($" INNER JOIN Authors as author on author.Id = auInpe.AuthorId");
            sql.Append($" WHERE pe.Id = @Id");

            using (var connection = CreateConnection())
            {
                var printingEditions = await connection.QueryAsync<PrintingEdition, Author, PrintingEdition>(sql.ToString(),
                    (printingEdition, author) =>
                    {
                        printingEdition.AuthorInPrintingEdition.Add(new AuthorInPrintingEdition { Author = author });
                        return printingEdition;
                    },
                    new { Id = id },
                    splitOn: "Id");

                var groupedPrintingEditions = printingEditions.GroupBy(printingEdition => printingEdition.Id).Select(groupPrintingEdition =>
                {
                    var groupedPrintingEdition = groupPrintingEdition.First();
                    groupedPrintingEdition.AuthorInPrintingEdition = groupPrintingEdition.Select(printingEdition => printingEdition.AuthorInPrintingEdition.Single()).ToList();
                    return groupedPrintingEdition;
                }).FirstOrDefault();

                return groupedPrintingEditions;
            }
        }

        public async Task<PrintingEdition> GetPrintingEditionByTitleAsync(string title)
        {

            using (var connection = CreateConnection())
            {
                var result = await connection.QueryFirstOrDefaultAsync<PrintingEdition>($"SELECT * FROM PrintingEditions  WHERE Title=@title", new { Title = title});
                return result;
            }
        }

    }
}
