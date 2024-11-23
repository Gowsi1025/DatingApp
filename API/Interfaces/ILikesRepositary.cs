using API.DTOs;
using API.entities;
using API.Helpers;

namespace API.Interfaces;

public interface ILikesRepositary
{
    Task<UserLike>GetUserLike(int sourceUserId, int targetUserId);
    Task<PagedList<MemberDto>>GetUserLikes(LikesParams likesParams);
    Task<IEnumerable<int>>GetCurrentUserLikeIds(int currentUserId);
    void DeleteLike(UserLike like);
    void AddLike(UserLike like);


}
