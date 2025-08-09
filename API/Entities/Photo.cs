namespace API.Entities;

public class Photo
{
    public Guid Id { get; init; } = Guid.NewGuid();

    public required string Url { get; set; }

    public string? PublicId { get; set; }

    // Navigation properties
    public Member Member { get; set; } = null!;

    public Guid? UserId { get; set; }
}