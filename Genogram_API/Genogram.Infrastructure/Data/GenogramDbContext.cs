using Genogram.Domain.Entites;
using Microsoft.EntityFrameworkCore;

namespace Genogram.Infrastructure.Data
{
    public class GenogramDbContext : DbContext
    {
        public GenogramDbContext(DbContextOptions<GenogramDbContext> options):base(options) { }


        public DbSet<UserEntity> Users { get; set; }
        public DbSet<UserRelationEntity> UserRelations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the one-to-many relationship
     // Foreign key in UserRelationEntity

            // Seed Users
            modelBuilder.Entity<UserEntity>().HasData(
                new UserEntity
                {
                    Id = 1,
                    Name = "John Doe",
                    Street = "123 Elm Street",
                    City = "Springfield",
                    Pincode = "12345",
                    Nationality = "American",
                    Language = "English",
                    Email = "john.doe@example.com",
                    DateOfBirth = "1985-01-01"
                },
                new UserEntity
                {
                    Id = 2,
                    Name = "Jane Smith",
                    Street = "456 Oak Avenue",
                    City = "Shelbyville",
                    Pincode = "67890",
                    Nationality = "Canadian",
                    Language = "French",
                    Email = "jane.smith@example.com",
                    DateOfBirth = "1990-05-15"
                }
            );

            // Seed UserRelations
            modelBuilder.Entity<UserRelationEntity>().HasData(
                new UserRelationEntity
                {
                    Id = 1,
                    FirstName = "Michael",
                    LastName = "Doe",
                    Relationship = "Son",
                    Phone="7569373620",
                    Email = "michael.doe@example.com",
                    PrimaryContact = true,
                    UserId = 1 // Related to User with Id = 1
                },
                new UserRelationEntity
                {
                    Id = 2,
                    FirstName = "Anna",
                    LastName = "Doe",
                    Relationship = "Daughter",
                    Phone="9550788502",
                    Email = "anna.doe@example.com",
                    PrimaryContact = false,
                    UserId = 1 // Related to User with Id = 1
                },
                new UserRelationEntity
                {
                    Id = 3,
                    FirstName = "Mark",
                    LastName = "Smith",
                    Relationship = "Brother",
                    Email = "mark.smith@example.com",
                    PrimaryContact = true,
                    UserId = 2 // Related to User with Id = 2
                }
            );
        }

    }
}

