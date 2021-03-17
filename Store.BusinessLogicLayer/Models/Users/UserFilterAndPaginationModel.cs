using Store.DataAccessLayer.Models.Pagination;
using Store.DataAccessLayer.Models.User;

namespace Store.BusinessLogicLayer.Models.Users
{
    public class UserFilterAndPaginationModel
    {
        public UserFilterModel UserFilterModels { get; set; }
        public PaginationFilterModel PaginationFilterModel { get; set; }
    }
}
