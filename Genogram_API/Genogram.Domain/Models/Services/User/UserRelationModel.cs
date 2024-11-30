using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genogram.Domain.Models.Services.User
{
    public class UserRelationModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string? LastName { get; set; }
        public string? Relationship { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public Boolean PrimaryContact { get; set; }
        public string? Remarks { set; get; }

        // Foreign key to UserEntity
        public int UserId { get; set; }
    }
}
