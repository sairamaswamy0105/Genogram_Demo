using Genogram.Domain.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genogram.Domain.Interfaces.Services
{
    public interface IUserService
    {
        public Task<List<UserEntity>> GetAllUsers();
        public  Task<List<UserRelationEntity>> GetUserRelationsAsync(int userId);
        public Task RemoveAllPrimaryContacts();
        public  Task<UserEntity> GetUserAsync(int userId);
        public Task AddUserRelation(UserRelationEntity newUserRelation);
        public Task UpdateUserRelation(UserRelationEntity newUserRelation);
        public Task DeleteUserById(int userId);
        public Task AddUser(UserEntity userEntity);
        public Task UpdateUser(UserEntity userEntity);
    }
}
