using AutoMapper;
using Store.BusinessLogicLayer.Models.Authentication;
using Store.DataAccessLayer.Entities;

namespace Store.BusinessLogicLayer.Mapper
{
    public class RegisterProfile : Profile
    {
        public RegisterProfile()
        {
            CreateMap<RegisterModel, User>()
                .ForMember(name => name.UserName, s => s.MapFrom(x => x.Email));

            CreateMap<User, RegisterModel>();
        }
    }
}
