using Store.DataAccessLayer.Models.Pagination;
using Store.DataAccessLayer.Models.PrintingEdition;

namespace Store.BusinessLogicLayer.Models.PrintingEditions
{
    public class PrintingEditionFilterAndPaginationModel
    {
        public PrintingEditionFilterModel PrintingEditionFilterModels { get; set; }
        public PaginationFilterModel PaginationFilterModels { get; set; }
    }
}
