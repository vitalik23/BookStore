using Store.DataAccessLayer.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Store.DataAccessLayer.Repositories.Interfaces
{
    public interface IAuthorInPrintingEditionRepository : IGenericRepository<AuthorInPrintingEdition>
    {
        public Task AddAuthorToPrintingEditionAsync(List<long> authorsId, long printingEdId);
        public Task<List<long>> GetAuthorsIdOfPrintingEditionAsync(long printingEditionId);
    }
}
