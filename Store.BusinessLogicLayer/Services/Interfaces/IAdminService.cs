using Store.BusinessLogicLayer.Models.Users;
using System.Threading.Tasks;

namespace Store.BusinessLogicLayer.Services.Interfaces
{
    public interface IAdminService
    {
        public Task<UserModel> UpdateUserAsync(UserModel model);
    }
}
