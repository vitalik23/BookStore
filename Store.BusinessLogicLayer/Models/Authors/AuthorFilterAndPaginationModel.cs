using Store.DataAccessLayer.Models.Author;
using Store.DataAccessLayer.Models.Pagination;

namespace Store.BusinessLogicLayer.Models.Authors
{
    public class AuthorFilterAndPaginationModel
    {
        public AuthorFilterModel AuthorFilterModels { get; set; }
        public PaginationFilterModel PaginationFilterModels { get; set; }
    }
}
