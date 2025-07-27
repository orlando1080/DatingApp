namespace API.Entities;

public class AppMember
{
    public Guid Id { get; set; }
    public required string Email { get; set; }
    public required string DisplayName { get; set; }
    public string? ImageUrl { get; set; }
    public required byte[] PasswordHash { get; set; }
    public required byte[] PasswordSalt { get; set; }
}