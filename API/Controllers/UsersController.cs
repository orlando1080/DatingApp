using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController(DataContext dataContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<AppUser>>> GetUsers() => await dataContext.Users.ToListAsync();

    [HttpGet("{id:int}")]
    public async Task<ActionResult<AppUser>> GetUser(int id)
    {
        AppUser? user = await dataContext.Users.FindAsync(id);

        return  user is null ? NotFound() : user;
    }
}