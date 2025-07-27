using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    public required string Email { get; set; }
    public required string Password { get; set; }
    public required string DisplayName { get; set; }
}