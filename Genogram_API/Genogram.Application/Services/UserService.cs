using Genogram.Domain.Entites;
using Genogram.Domain.Interfaces.Services;
using Genogram.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genogram.Application.Services
{
    public class UserService :IUserService
    {
        private readonly GenogramDbContext genogramDbContext;

        public UserService(GenogramDbContext genogramDbContext)
        {
            this.genogramDbContext = genogramDbContext;
        }
        public async Task<List<UserEntity>> GetAllUsers()
        {
            return await genogramDbContext.Users.ToListAsync();
        }

        public async Task<List<UserRelationEntity>> GetUserRelationsAsync(int userId)
        {
            return await genogramDbContext.UserRelations
                .Where(ur => ur.UserId == userId)
                .ToListAsync();
        }
        public async Task RemoveAllPrimaryContacts()
        {
            var userEntity = await genogramDbContext.UserRelations.FirstOrDefaultAsync(e => e.PrimaryContact == true);
            if(userEntity!=null)
            {

            userEntity.PrimaryContact= false;
            await genogramDbContext.SaveChangesAsync();
            }
        }
        public async Task<UserEntity> GetUserAsync(int userId)
        {
            var user = await genogramDbContext.Users.FindAsync(userId);
            return user;
        }
        public async Task AddUserRelation(UserRelationEntity newUserRelation)
        {
            genogramDbContext.UserRelations.Add(newUserRelation);
            await genogramDbContext.SaveChangesAsync();
        }
        public async Task UpdateUserRelation(UserRelationEntity newUserRelation)
        {
            // Detach any existing entity that might be tracked
            var trackedEntity = genogramDbContext.UserRelations.Local
                .FirstOrDefault(e => e.Id == newUserRelation.Id);

            if (trackedEntity != null)
            {
                genogramDbContext.Entry(trackedEntity).State = EntityState.Detached;
            }

            genogramDbContext.UserRelations.Update(newUserRelation);
            await genogramDbContext.SaveChangesAsync();

        }

        public async Task DeleteUserById(int userId)
        {
            UserRelationEntity userRelationEntity=genogramDbContext.UserRelations.Find(userId);
            if (userRelationEntity != null)
            {
                genogramDbContext.UserRelations.Remove(userRelationEntity);
                await genogramDbContext.SaveChangesAsync();
            }
        }

        public async Task AddUser(UserEntity userEntity)
        {
            genogramDbContext.Users.Add(userEntity);
            await genogramDbContext.SaveChangesAsync();
        }

        public async Task UpdateUser(UserEntity userEntity)
        {
            UserEntity temporaryUserData=await genogramDbContext.Users.FindAsync(userEntity.Id);
            if(temporaryUserData != null)
            {
                temporaryUserData.Name = userEntity.Name;
                temporaryUserData.Street = userEntity.Street;
                temporaryUserData.City = userEntity.City;
                temporaryUserData.Pincode = userEntity.Pincode;
                temporaryUserData.Nationality = userEntity.Nationality;
                temporaryUserData.Language = userEntity.Language;
                temporaryUserData.Email = userEntity.Email;
                temporaryUserData.DateOfBirth = userEntity.DateOfBirth;
                if(userEntity.UserImage != null)
                {
                temporaryUserData.UserImage = userEntity.UserImage;
                }
            }
            await genogramDbContext.SaveChangesAsync();
        }
    }
}
