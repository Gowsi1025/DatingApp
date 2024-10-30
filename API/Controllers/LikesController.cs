using System;
using API.DTOs;
using API.entities;
using API.Extentions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class LikesController(ILikesRepositary likesRepositary) : BaseApiController
{
    [HttpPost("{targetUserId: int}")]

    public async Task<IActionResult> ToggleLike(int targetUserId)
    {
        var sourceUserId = User.GetUserId();
        if (sourceUserId == targetUserId) return BadRequest("You cannot like yourself");

        var existingLike = await likesRepositary.GetUserLike(sourceUserId, targetUserId);
        if (existingLike == null)
        {
            var like = new UserLike
            {
                SourceUserId = sourceUserId,
                TargetUserId = targetUserId
            };
            likesRepositary.AddLike(like);
        }
        else
        {
            likesRepositary.DeleteLike(existingLike);
        }

        if (await likesRepositary.SaveChanges()) return Ok();

        return BadRequest("Failed to upload");
    }

    [HttpGet("list")]

    public async Task<ActionResult<IEnumerable<int>>> GetCurrentUserLikeIds()
    {
        return Ok(await likesRepositary.GetCurrentUserLikeIds(User.GetUserId()));
    }

    [HttpGet]

    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUserLikes(string predicate)
    {
        var users = await likesRepositary.GetUserLikes(predicate, User.GetUserId());

        return Ok(users);
    }
}
