using Microsoft.EntityFrameworkCore;
using Store.DataAccessLayer.AppContext;
using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Models.Pagination;
using Store.DataAccessLayer.Models.PrintingEdition;
using Store.DataAccessLayer.Repositories.Interfaces;
using Store.Shared.Constants;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;

namespace Store.DataAccessLayer.Repositories.EFRepositories
{
    public class PrintingEditionRepository : GenericRepository<PrintingEdition> , IPrintingEditionRepository
    {

        public PrintingEditionRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task<(IEnumerable<PrintingEdition>, int)> GetFilteredPrintingEditionsAsync(PrintingEditionFilterModel model, PaginationFilterModel pagination)
        {
            var result = await _dbSet
                        .Include(authorInPe => authorInPe.AuthorInPrintingEdition)
                        .ThenInclude(author => author.Author)
                        .Where(printingEdition => model.Category == null || model.Category.Contains(printingEdition.Type))
                        .Where(printingEdition => model.PrintingEditionName == null || EF.Functions.Like(printingEdition.Title, $"%{model.PrintingEditionName}%"))
                        .Where(printingEdition => (model.MinPrice == null || model.MaxPrice == null) || (printingEdition.Price >= model.MinPrice && printingEdition.Price <= model.MaxPrice))
                        .Where(printingEdition => model.AuthorName == null || printingEdition.AuthorInPrintingEdition
                                                        .Any(author => EF.Functions.Like(author.Author.Name, $"%{model.AuthorName}%")))
                        .OrderBy($"{model.SortBy} {model.TypeSort}")
                        .ToListAsync();

            int countElement = result.Count();

            result = result.Skip((pagination.PageNumber - Constants.Page.PAGE_NUMBER) * pagination.PageSize).Take(pagination.PageSize).ToList();

            (IEnumerable<PrintingEdition>, int) tupleResult = (result, countElement);

            return tupleResult;

        }

        public async Task<PrintingEdition> GetPrintingEditionByIdAsync(long id)
        {
            var result = await _dbSet
                                .Include(authorInPE => authorInPE.AuthorInPrintingEdition)
                                .ThenInclude(author => author.Author)
                                .FirstOrDefaultAsync(pe => pe.Id.Equals(id));
            return result;
        }

        public async Task<decimal> GetMaxPricePrintingEditionAsync()
        {
            decimal result = await _dbSet.MaxAsync(printingEdition => printingEdition.Price);
            return result;
        }
        public async Task<PrintingEdition> GetPrintingEditionByTitleAsync(string title)
        {
            var result = await _dbSet.FirstOrDefaultAsync(printingEdition => printingEdition.Title.Equals(title));
            return result;
        }

    }
}
