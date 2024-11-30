using Genogram.Application.Projections;
using Genogram.Application.Services;
using Genogram.Domain.Interfaces.Services;
using Genogram.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder
            .AllowAnyHeader()
             .AllowAnyMethod()
            .WithOrigins("https://localhost:4200"));
});

builder.Services.AddControllers();

// Configure Entity Framework with SQL Server
builder.Services.AddDbContext<GenogramDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register custom services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<Conversions>();
// Configure Session services
builder.Services.AddDistributedMemoryCache(); // Required for session storage
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Session timeout
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true; // Mark cookie as essential
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRequestLocalization();
app.UseRouting();

// Enable Session middleware
app.UseSession();

app.UseCors("AllowSpecificOrigin");
app.UseAuthentication();
app.UseAuthorization();

// Configure route mapping
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
