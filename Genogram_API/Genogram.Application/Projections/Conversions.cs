using Genogram.Domain.Entites;
using Genogram.Domain.Models.Services.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genogram.Application.Projections
{
    public class Conversions
    {
        public UserEntity ConversionToUserEntity(UserModel userModel)
        {
            return new UserEntity {
                Id = userModel.Id,
                Name=userModel.Name,
                Street = userModel.Street,
                City = userModel.City,
                Pincode = userModel.Pincode,
                Nationality = userModel.Nationality,
                Language = userModel.Language,
                Email = userModel.Email,
                DateOfBirth = userModel.DateOfBirth,
                UserImage=userModel.UserImage

            };
        }

        public UserModel ConversionToUserModel(UserEntity userEntity)
        {
            return new UserModel
            {
                Id = userEntity.Id,
                Name = userEntity.Name,
                Street = userEntity.Street,
                City = userEntity.City,
                Pincode = userEntity.Pincode,
                Nationality = userEntity.Nationality,
                Language = userEntity.Language,
                Email = userEntity.Email,
                DateOfBirth = userEntity.DateOfBirth,
                UserImage=userEntity.UserImage

            };
        }
        public UserRelationModel ConversionToUserRelationModel(UserRelationEntity userRelationEntity)
        {
            return new UserRelationModel
            {
                Id= userRelationEntity.Id,
                FirstName= userRelationEntity.FirstName,
                LastName= userRelationEntity.LastName,
                Relationship= userRelationEntity.Relationship,
                Phone= userRelationEntity.Phone,    
                Email= userRelationEntity.Email,
                PrimaryContact= userRelationEntity.PrimaryContact,
                Remarks=userRelationEntity.Remarks,
                UserId= userRelationEntity.UserId
            };
        }
        public UserRelationEntity ConversionToUserRelationEntity(UserRelationModel userRelationModel)
        {
            return new UserRelationEntity
            {
                Id = userRelationModel.Id,
                FirstName = userRelationModel.FirstName,
                LastName = userRelationModel.LastName,
                Relationship = userRelationModel.Relationship,
                Phone= userRelationModel.Phone,
                Email = userRelationModel.Email,
                PrimaryContact = userRelationModel.PrimaryContact,
                Remarks=userRelationModel.Remarks,
                UserId = userRelationModel.UserId

            };
        }

    }
}
