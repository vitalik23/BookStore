using Microsoft.EntityFrameworkCore;
using Store.DataAccessLayer.AppContext;
using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Models.Author;
using Store.DataAccessLayer.Models.Pagination;
using Store.DataAccessLayer.Repositories.Interfaces;
using Store.Shared.Constants;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;
using System;

namespace Store.DataAccessLayer.Repositories.EFRepositories
{
    public class AuthorRepository : GenericRepository<Author>, IAuthorRepository
    {
        public AuthorRepository(ApplicationContext context) : base(context)
        {

        }

        public async Task<(IEnumerable<Author>, int)> GetFilteredAuthorsAsync(AuthorFilterModel model, PaginationFilterModel pagination)
        {
            var result = await _dbSet
                        .Include(pe => pe.AuthorInPrintingEdition)
                        .ThenInclude(u => u.PrintingEdition)
                        .OrderBy($"{model.SortBy} {model.TypeSort}") 
                        .Where(author => model.Name == null || EF.Functions.Like(author.Name, $"%{model.Name}%"))
                        .ToListAsync();

            int countElement = result.Count();

            result = result.Skip((pagination.PageNumber - Constants.Page.PAGE_NUMBER) * pagination.PageSize).Take(pagination.PageSize).ToList();

            var tupleResult = (result, countElement);

            return tupleResult;
        }

        public async Task<Author> GetAuthorByNameAsync(string name)
        {
            var result = await _dbSet.FirstOrDefaultAsync(author => author.Name.Equals(name));
            return result;
        }

    }
}
