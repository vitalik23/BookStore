using Store.BusinessLogicLayer.Services.Interfaces;
using Store.DataAccessLayer.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Store.BusinessLogicLayer.Services
{
    public class AuthorInPrintingEditionService : IAuthorInPrintingEditionService
    {
        private IAuthorInPrintingEditionRepository _authorInPERepository;

        public AuthorInPrintingEditionService(IAuthorInPrintingEditionRepository authorInPERepository)
        {
            _authorInPERepository = authorInPERepository;
        }

        public async Task AddAuthorToPEAsync(List<long> authorsId, long printingEdId)
        {
            await _authorInPERepository.AddAuthorToPrintingEditionAsync(authorsId, printingEdId);
        }

        public async Task<List<long>> GetAuthorsIdOfPrintingEditionAsync(long printingEditionId)
        {
            List<long> authorsId = await _authorInPERepository.GetAuthorsIdOfPrintingEditionAsync(printingEditionId);
            return authorsId;
        }
    }
}
