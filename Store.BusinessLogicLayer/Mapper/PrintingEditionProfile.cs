using AutoMapper;
using Store.BusinessLogicLayer.Models.PrintingEditions;
using Store.DataAccessLayer.Entities;

namespace Store.BusinessLogicLayer.Mapper
{
    public class PrintingEditionProfile : Profile
    {
        public PrintingEditionProfile()
        {
            CreateMap<PrintingEdition, PrintingEditionModel>()
                .ForMember(desc => desc.SubSubTitle, act => act.DoNotAllowNull())
                .ForMember(desc => desc.Subtitle, act => act.DoNotAllowNull());
            CreateMap<PrintingEditionModel, PrintingEdition>()
                .ForMember(desc => desc.SubSubTitle, act => act.DoNotAllowNull())
                .ForMember(desc => desc.Subtitle, act => act.DoNotAllowNull());
        }
    }
}
