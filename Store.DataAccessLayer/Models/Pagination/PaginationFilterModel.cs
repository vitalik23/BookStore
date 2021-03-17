

using Store.Shared.Constants;

namespace Store.DataAccessLayer.Models.Pagination
{
    public class PaginationFilterModel
    {
        public PaginationFilterModel()
        {
            PageNumber = Constants.Page.PAGE_NUMBER;
            PageSize = Constants.Page.PAGE_SIZE_ELEMENTS;
        }

        public PaginationFilterModel(int pageNumber, int pageSize)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
        }

        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}
