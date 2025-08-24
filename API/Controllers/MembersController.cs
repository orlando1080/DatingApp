using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class MembersController(IMemberRepository memberRepository) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Member>>> GetUsers()
    {
        return Ok(await memberRepository.GetMembersAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Member>> GetUser(string id)
    {
        var member = await memberRepository.GetMemberByIdAsync(id);

        return member is null ? NotFound() : member;
    }

    [HttpGet("{id}/photos")]
    public async Task<ActionResult<IReadOnlyList<Photo>>> GetMemberPhotos(string id)
    {
        return Ok(await memberRepository.GetPhotosForMemberAsync(id));
    }
}