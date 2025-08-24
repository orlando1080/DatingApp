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
        if (await UserExists(registerDto.Email)) return BadRequest("Email already exists");

        using HMACSHA512 hmac = new();

        User user = new()
        {
            DisplayName = registerDto.DisplayName.ToLower(),
            Email = registerDto.Email.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key
        };


        context.Users.Add(user);
        await context.SaveChangesAsync();

        return new UserDto
        {
            Id = user.Id,
            DisplayName = user.DisplayName,
            Email = user.Email,
            ImageUrl = user.ImageUrl,
            Token = tokenService.CreateToken(user)
        };
    }

    [HttpPost("login")] // account/login
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await context.Users.FirstOrDefaultAsync(x => x.Email.ToLower() == loginDto.Email.ToLower());

        if (user is null) return Unauthorized("Invalid email");

        using HMACSHA512 hmac = new(user.PasswordSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        if (computedHash.Where((t, i) => t != user.PasswordHash[i]).Any()) return Unauthorized("Invalid password");

        return Ok(new UserDto
        {
            Id = user.Id,
            DisplayName = user.DisplayName,
            Email = user.Email,
            ImageUrl = user.ImageUrl,
            Token = tokenService.CreateToken(user)
        });
    }

    private async Task<bool> UserExists(string email)
    {
        return await context.Users.AnyAsync(x => x.Email.ToLower() == email.ToLower());
    }
}