using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Models.Author;
using Store.DataAccessLayer.Models.Pagination;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Store.DataAccessLayer.Repositories.Interfaces
{
    public interface IAuthorRepository : IGenericRepository<Author>
    {
        public Task<(IEnumerable<Author>, int)> GetFilteredAuthorsAsync(AuthorFilterModel model, PaginationFilterModel pagination);
        public Task<Author> GetAuthorByNameAsync(string name);
    }
}
