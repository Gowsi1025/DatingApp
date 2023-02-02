using API.DTOs;
using API.entities;
using AutoMapper;
using API.Helpers;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>();
            CreateMap<AppUser, PhotoDto>();
        }
    }
}