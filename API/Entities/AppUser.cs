using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class AppUser
{
    public string Id { get; init; } = null!;

    public required string Email { get; set; }

    public required string DisplayName { get; set; }

    public string? ImageUrl { get; set; }

    public required byte[] PasswordHash { get; set; }

    public required byte[] PasswordSalt { get; set; }

    // Navigation properties
    public Member Member { get; set; } = null!;
}