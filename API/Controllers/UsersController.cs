using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class UsersController(DataContext dataContext) : BaseApiController
{
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<List<AppUser>>> GetUsers()
    {
        return await dataContext.Users.ToListAsync();
    }

    [Authorize]
    [HttpGet("{id:int}")]
    public async Task<ActionResult<AppUser>> GetUser(int id)
    {
        var user = await dataContext.Users.FindAsync(id);

        return user is null ? NotFound() : user;
    }
}