
using System.Collections.Generic;

namespace Store.DataAccessLayer.Models.Pagination
{
    public class PagedResponse<T> where T : class
    {
        public IEnumerable<T> Data { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalItems { get; set; }

    }
}
