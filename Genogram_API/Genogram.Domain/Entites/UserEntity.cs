namespace Genogram.Domain.Entites
{
    public class UserEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Street { get; set; }
        public string? City { get; set; }
        public string? Pincode { get; set; }
        public string? Nationality { get; set; }
        public string? Language { get; set; }
        public string? Email { get; set; }
        public string? DateOfBirth {  get; set; }
        public string? UserImage {  get; set; }

        // Navigation property for related UserRelationEntities
        public ICollection<UserRelationEntity> UserRelations { get; set; } = new List<UserRelationEntity>();

    }
}
