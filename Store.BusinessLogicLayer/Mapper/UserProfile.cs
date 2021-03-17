using AutoMapper;
using Store.BusinessLogicLayer.Models.Users;
using Store.DataAccessLayer.Entities;

namespace Store.BusinessLogicLayer.Mapper
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserModel, User>();
            CreateMap<User, UserModel>();
        }
    }
}
