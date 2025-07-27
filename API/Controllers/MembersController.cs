using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class MembersController(DataContext dataContext) : BaseApiController
{
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<List<AppMember>>> GetUsers()
    {
        return await dataContext.Members.ToListAsync();
    }

    [Authorize]
    [HttpGet("{id:Guid}")]
    public async Task<ActionResult<AppMember>> GetUser(Guid id)
    {
        AppMember? member = await dataContext.Members.FindAsync(id);

        return member is null ? NotFound() : member;
    }
}