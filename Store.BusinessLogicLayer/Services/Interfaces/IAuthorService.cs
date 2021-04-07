using Store.BusinessLogicLayer.Models.Authors;
using Store.DataAccessLayer.Models.Author;
using Store.DataAccessLayer.Models.Pagination;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Store.BusinessLogicLayer.Services.Interfaces
{
    public interface IAuthorService
    {
        public Task<AuthorModel> GetAuthorAsync(long id);
        public Task<AuthorModel> CreateAuthorAsync(AuthorModel model);
        public Task<AuthorModel> UpdateAuthorAsync(AuthorModel model);
        public Task DeleteAuthorAsync(long id);
        public Task<PagedResponse<AuthorModel>> GetFilteredAuthorsAsync(AuthorFilterModel model, PaginationFilterModel pagination);
        public Task<IEnumerable<AuthorModel>> GetAllAuthorsAsync();
    }
}
