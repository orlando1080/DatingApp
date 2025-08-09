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

        string userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

        List<SeedUserDto>? users = JsonSerializer.Deserialize<List<SeedUserDto>>(userData);

        if (users == null)
        {
            Console.WriteLine("No members in seed data");
            return;
        }

        using HMACSHA512 hmac = new();

        foreach (SeedUserDto user in users)
        {
            AppUser appUser = new()
            {
                Id = user.Id,
                Email = user.Email,
                DisplayName = user.DisplayName,
                ImageUrl = user.ImageUrl,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$word")),
                PasswordSalt = hmac.Key,
                Member = new Member
                {
                    Id = user.Id,
                    Gender = user.Gender,
                    DateOfBirth = user.DateOfBirth,
                    DisplayName = user.DisplayName,
                    Created = user.Created,
                    LastActive = user.LastActive,
                    Description = user.Description,
                    City = user.City,
                    Country = user.Country,
                    ImageUrl = user.ImageUrl
                }
            };

            appUser.Member.Photos.Add(new Photo
            {
                Url = user.ImageUrl!,
                UserId = user.Id,
            });

            context.Users.Add(appUser);
        }

        await context.SaveChangesAsync();
    }
}