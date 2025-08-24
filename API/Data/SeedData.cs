using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class SeedData
{
    public static async Task SeedUsers(DataContext context)
    {
        if (await context.Members.AnyAsync()) return;

        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

        var seedUsers = JsonSerializer.Deserialize<List<SeedUserDto>>(userData);

        if (seedUsers == null)
        {
            Console.WriteLine("No members in seed data");
            return;
        }

        foreach (var seedUser in seedUsers)
        {
            using HMACSHA512 hmac = new();

            User user = new()
            {
                Id = seedUser.Id,
                Email = seedUser.Email,
                DisplayName = seedUser.DisplayName,
                ImageUrl = seedUser.ImageUrl,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$word")),
                PasswordSalt = hmac.Key,
                Member = new Member
                {
                    Id = seedUser.Id,
                    Gender = seedUser.Gender,
                    DateOfBirth = seedUser.DateOfBirth,
                    DisplayName = seedUser.DisplayName,
                    Created = seedUser.Created,
                    LastActive = seedUser.LastActive,
                    Description = seedUser.Description,
                    City = seedUser.City,
                    Country = seedUser.Country,
                    ImageUrl = seedUser.ImageUrl
                }
            };

            user.Member.Photos.Add(new Photo
            {
                Url = seedUser.ImageUrl!,
                MemberId = seedUser.Id
            });

            context.Users.Add(user);
        }

        await context.SaveChangesAsync();
    }
}