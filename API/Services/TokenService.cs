using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService(IConfiguration config) : ITokenService
{
    public string CreateToken(AppUser user)
    {
        var tokenKey = config.GetValue<string>("TokenKey") ?? throw new Exception("Token Key not found");

        if (tokenKey.Length < 64) throw new Exception("Token Key is too short");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

        List<Claim> claims =
        [
            new(ClaimTypes.NameIdentifier, user.Username)
        ];

        SigningCredentials credentials = new(key, SecurityAlgorithms.HmacSha256);

        SecurityTokenDescriptor tokenDescriptor = new()
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = credentials
        };

        JwtSecurityTokenHandler tokenHandler = new();

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}