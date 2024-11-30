using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Genogram.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SeedingData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Street = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Pincode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Nationality = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Language = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateOfBirth = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserImage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserRelations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Relationship = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PrimaryContact = table.Column<bool>(type: "bit", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRelations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserRelations_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "City", "DateOfBirth", "Email", "Language", "Name", "Nationality", "Pincode", "Street", "UserImage" },
                values: new object[,]
                {
                    { 1, "Springfield", "1985-01-01", "john.doe@example.com", "English", "John Doe", "American", "12345", "123 Elm Street", null },
                    { 2, "Shelbyville", "1990-05-15", "jane.smith@example.com", "French", "Jane Smith", "Canadian", "67890", "456 Oak Avenue", null }
                });

            migrationBuilder.InsertData(
                table: "UserRelations",
                columns: new[] { "Id", "Email", "FirstName", "LastName", "Phone", "PrimaryContact", "Relationship", "Remarks", "UserId" },
                values: new object[,]
                {
                    { 1, "michael.doe@example.com", "Michael", "Doe", "7569373620", true, "Son", null, 1 },
                    { 2, "anna.doe@example.com", "Anna", "Doe", "9550788502", false, "Daughter", null, 1 },
                    { 3, "mark.smith@example.com", "Mark", "Smith", null, true, "Brother", null, 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserRelations_UserId",
                table: "UserRelations",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserRelations");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
