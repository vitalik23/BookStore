using Store.BusinessLogicLayer.Models.PrintingEditions;
using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Models.Pagination;
using Store.DataAccessLayer.Models.PrintingEdition;
using System.Threading.Tasks;

namespace Store.BusinessLogicLayer.Services.Interfaces
{
    public interface IPrintingEditionService
    {
        public Task<PrintingEditionModel> CreatePrintingEditionAsync(PrintingEditionModel model);
        public Task<PrintingEditionModel> UpdatePrintingEditionAsync(PrintingEditionModel model);
        public Task DeletePrintingEditionAsync(long id);
        public Task<PagedResponse<PrintingEditionModel>> GetFilteredPrintingEditionsAsync(PrintingEditionFilterModel model, PaginationFilterModel pagination);
        public Task<PrintingEdition> GetPrintingEditionByIdAsync(long id);
        public Task<PrintingEditionModel> GetDataPrintingEditionAsync(long id);
        public Task<decimal> GetMaxPricePrintingEditionAsync();
    }
}
