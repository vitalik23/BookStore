using Store.DataAccessLayer.Models.Pagination;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Store.DataAccessLayer.Repositories.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        public Task CreateAsync(T item);
        public Task UpdateAsync(T item);
        public Task DeleteAsync(T item);
        public Task<IEnumerable<T>> GetAsync();
        public Task<T> GetByIdAsync(long id);
        public Task AddRangeAsync(IEnumerable<T> item);
    }
}
