using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
            .ForMember(
                pt => pt.ProductBrand,opt => opt.MapFrom( p => p.ProductBrand.Name )
            ).ForMember(
                 pt => pt.ProductType,opt => opt.MapFrom( p => p.ProductType.Name )
            ).ForMember(
                pt => pt.PictureUrl, opt => opt.MapFrom<ProductUrlResolver>()
            )
            ;
        }
    }
}