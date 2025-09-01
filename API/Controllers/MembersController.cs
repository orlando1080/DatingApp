using System.Security.Claims;
using API.DTOs;
using API.Entities;
using API.Extensions;
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

    [HttpPut]
    public async Task<ActionResult> UpdateMember(MemberUpdateDto memberUpdateDto)
    {
        string memberId = User.GetUserId();

        Member? member = await memberRepository.GetMemberForUpdateAsync(memberId);

        if (member is null)
        {
            return BadRequest("Member does not exist");
        }

        member.DisplayName = memberUpdateDto.DisplayName ?? member.DisplayName;
        member.Description = memberUpdateDto.Description ?? member.Description;
        member.City = memberUpdateDto.City ?? member.City;
        member.Country = memberUpdateDto.Country ?? member.Country;
        member.User.DisplayName = memberUpdateDto.DisplayName ?? member.User.DisplayName;

        memberRepository.Update(member);

        if (await memberRepository.SaveAllAsync())
        {
            return NoContent();
        }

        return BadRequest("Updating member failed");
    }
}