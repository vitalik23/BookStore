using Microsoft.EntityFrameworkCore;
using Store.DataAccessLayer.AppContext;
using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Store.DataAccessLayer.Repositories.EFRepositories
{
    public class AuthorInPrintingEditionRepository : GenericRepository<AuthorInPrintingEdition>, IAuthorInPrintingEditionRepository
    {
        public AuthorInPrintingEditionRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task AddAuthorToPrintingEditionAsync(List<long> authorsId, long printingEditionId)
        {
            var authorInprinting = new List<AuthorInPrintingEdition>();

            authorsId.ForEach(authorId => authorInprinting.Add(new AuthorInPrintingEdition
            {
                AuthorId = authorId,
                PrintingEditionId = printingEditionId
            }));

            await AddRangeAsync(authorInprinting);
        }

        public async Task<List<long>> GetAuthorsIdOfPrintingEditionAsync(long printingEditionId)
        {
            var result = await _dbSet
                .Where(printing => printing.PrintingEditionId == printingEditionId)
                .Select(printing => printing.AuthorId)
                .ToListAsync();

            return result;
        }

    }
}
