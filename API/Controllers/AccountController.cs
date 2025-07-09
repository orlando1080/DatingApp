using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")] // account/register
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.Username)) return BadRequest("Username already exists");

        using HMACSHA512 hmac = new();

        AppUser user = new()
        {
            Username = registerDto.Username.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key
        };


        context.Users.Add(user);
        await context.SaveChangesAsync();

        return new UserDto
        {
            Username = user.Username,
            Token = tokenService.CreateToken(user)
        };
    }

    [HttpPost("login")] // account/login
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await context.Users.FirstOrDefaultAsync(x => x.Username.ToLower() == loginDto.Username.ToLower());

        if (user is null) return Unauthorized("Invalid username");

        using HMACSHA512 hmac = new(user.PasswordSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        if (computedHash.Where((t, i) => t != user.PasswordHash[i]).Any()) return Unauthorized("Invalid password");

        return Ok(new UserDto
        {
            Username = user.Username,
            Token = tokenService.CreateToken(user)
        });
    }

    private async Task<bool> UserExists(string username)
    {
        return await context.Users.AnyAsync(x => x.Username.ToLower() == username.ToLower());
    }
}