using System.Text.Json.Serialization;

namespace Genogram.Domain.Entites
{
    public class UserRelationEntity
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string? LastName { get; set; }
        public string? Relationship { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public Boolean PrimaryContact {  get; set; }
        public string? Remarks { set; get; }

        // Foreign key to UserEntity
        public int UserId { get; set; }
        [JsonIgnore]
        public UserEntity User { get; set; } = null!;
    }
}
