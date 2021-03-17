using System.Collections.Generic;
using System.Threading.Tasks;

namespace Store.BusinessLogicLayer.Services.Interfaces
{
    public interface IAuthorInPrintingEditionService
    {
        public Task AddAuthorToPEAsync(List<long> authorsId, long printingEdId);
        public Task<List<long>> GetAuthorsIdOfPrintingEditionAsync(long printingEditionId);
    }
}
