using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

public class Member
{
    public Guid? Id { get; set; }

    public required string Gender { get; set; }

    public DateOnly DateOfBirth { get; set; }

    public required string DisplayName { get; set; }

    public DateTime Created { get; set; } = DateTime.UtcNow;

    public DateTime LastActive { get; set; } = DateTime.UtcNow;

    public string? Description { get; set; }

    public required string City { get; set; }

    public required string Country { get; set; }

    public string? ImageUrl { get; set; }

    // Navigation properties
    public List<Photo> Photos { get; set; } = [];

    [ForeignKey(nameof(Id))]
    public AppUser User { get; set; } = null!;
}