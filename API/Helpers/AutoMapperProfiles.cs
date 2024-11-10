using API.DTOs;
using API.entities;
using AutoMapper;
using API.Helpers;
using API.Extentions;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                           opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Age,opt => 
                           opt.MapFrom(src => src.DateOfBirth.CalculateAge()));           
            CreateMap<Photo, PhotoDto>();
            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<RegisterDto,AppUser>();
            CreateMap<string, DateOnly>().ConvertUsing( s => DateOnly.Parse(s));
            CreateMap<Message, MessageDto>()
                .ForMember(d => d.SenderPhotoUrl, 
                    o => o.MapFrom(s => s.Sender.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.RecipientPhotoUrl, 
                    o => o.MapFrom(s => s.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}