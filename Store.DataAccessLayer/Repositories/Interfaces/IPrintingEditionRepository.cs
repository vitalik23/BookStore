using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Models.Pagination;
using Store.DataAccessLayer.Models.PrintingEdition;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Store.DataAccessLayer.Repositories.Interfaces
{
    public interface IPrintingEditionRepository: IGenericRepository<PrintingEdition>
    {
        public Task<PrintingEdition> GetPrintingEditionByIdAsync(long id);
        public Task<(IEnumerable<PrintingEdition>, int)> GetFilteredPrintingEditionsAsync(PrintingEditionFilterModel model, PaginationFilterModel pagination);
        public Task<decimal> GetMaxPricePrintingEditionAsync();
        public Task<PrintingEdition> GetPrintingEditionByTitleAsync(string title);

    }
}
