using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required] [EmailAddress] public string Email { get; set; } = string.Empty;

    [Required]
    [MinLength(8, ErrorMessage = "Password must be at least 8 characters long.")]
    public string Password { get; set; } = string.Empty;

    [Required]
    [StringLength(50, MinimumLength = 3, ErrorMessage = "Display name must be between 3 and 50 characters long.")]
    public string DisplayName { get; set; } = string.Empty;
}