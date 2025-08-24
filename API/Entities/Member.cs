using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Entities;

public class Member
{
    public string Id { get; set; } = null!;

    public required string Gender { get; set; }

    public DateOnly DateOfBirth { get; set; }

    public required string DisplayName { get; set; }

    public DateTime Created { get; set; } = DateTime.UtcNow;

    public DateTime LastActive { get; set; } = DateTime.UtcNow;

    public string? Description { get; set; }

    public required string City { get; set; }

    public required string Country { get; set; }

    public string? ImageUrl { get; set; }

    /* Navigation properties one-to-many relationship. One member can have many photos.
     the type dictates the relationship*/
    [JsonIgnore] public List<Photo> Photos { get; set; } = [];


// One-to-one relationship with AppUser
    [JsonIgnore] [ForeignKey(nameof(Id))] public User User { get; set; } = null!;
}