using AutoMapper;
using Store.BusinessLogicLayer.Models.Authors;
using Store.DataAccessLayer.Entities;

namespace Store.BusinessLogicLayer.Mapper
{
    public class AuthorProfile : Profile
    {
        public AuthorProfile()
        {
            CreateMap<Author, AuthorModel>();
            CreateMap<AuthorModel, Author>();
        }
    }
}
