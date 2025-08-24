using System.Text.Json.Serialization;

namespace API.Entities;

public class Photo
{
    public Guid Id { get; init; } = Guid.NewGuid();

    public required string Url { get; set; }

    public string? PublicId { get; set; }

    // Navigation properties one-to-many relationship with a member. Many photos can belong to a single member
    [JsonIgnore] public Member Member { get; set; } = null!;

    public string MemberId { get; set; } = null!;
}