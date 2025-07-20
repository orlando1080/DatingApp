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
    public async Task<ActionResult<MemberDto>> Register(RegisterDto registerDto)
    {
        if (string.IsNullOrEmpty(registerDto.Email) || string.IsNullOrEmpty(registerDto.Password) ||
            string.IsNullOrEmpty(registerDto.DisplayName))
        {
            return BadRequest("All Fields are required to register");
        }

        if (await UserExists(registerDto.Email))
        {
            return BadRequest("Email already exists");
        }

        using HMACSHA512 hmac = new();

        AppMember member = new()
        {
            DisplayName = registerDto.DisplayName.ToLower(),
            Email = registerDto.Email.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key
        };


        context.Members.Add(member);
        await context.SaveChangesAsync();

        return new MemberDto
        {
            Id = member.Id,
            DisplayName = member.DisplayName,
            Email = member.Email,
            ImageUrl = member.ImageUrl,
            Token = tokenService.CreateToken(member)
        };
    }

    [HttpPost("login")] // account/login
    public async Task<ActionResult<MemberDto>> Login(LoginDto loginDto)
    {
        AppMember? member = await context.Members.FirstOrDefaultAsync(x => x.Email.ToLower() == loginDto.Email.ToLower());

        if (member is null)
        {
            return Unauthorized("Invalid email");
        }

        using HMACSHA512 hmac = new(member.PasswordSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        if (computedHash.Where((t, i) => t != member.PasswordHash[i]).Any()) return Unauthorized("Invalid password");

        return Ok(new MemberDto
        {
            Id = member.Id,
            DisplayName = member.DisplayName,
            Email = member.Email,
            ImageUrl = member.ImageUrl,
            Token = tokenService.CreateToken(member)
        });
    }

    private async Task<bool> UserExists(string email)
    {
        return await context.Members.AnyAsync(x => x.Email.ToLower() == email.ToLower());
    }
}