using API.Data;
using API.Extensions;
using API.Interfaces;
using API.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddApplicationServices(builder.Configuration);

builder.Services.AddIdentityServices(builder.Configuration);

builder.Services.AddScoped<IMemberRepository, MemberRepository>();

// Configure the HTTP request pipeline.
var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(x => x.AllowAnyHeader()
    .AllowAnyMethod()
    .WithOrigins("http://localhost:4200", "https://localhost:4200"));

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();

var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await SeedData.SeedUsers(context);
}
catch (Exception e)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(e, "An error occured during migration");
}

app.Run();