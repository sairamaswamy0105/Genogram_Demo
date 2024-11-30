using Genogram.Application.Projections;
using Genogram.Application.Services;
using Genogram.Domain.Entites;
using Genogram.Domain.Interfaces.Services;
using Genogram.Domain.Models.Services.User;
using Microsoft.AspNetCore.Mvc;

namespace Genogram.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserRelations : Controller
    {
        private readonly IUserService userService;
        private readonly Conversions conversions;
        public UserRelations(IUserService userService, Conversions conversions)
        {
            this.userService = userService;
            this.conversions = conversions;
        }
        [HttpGet("{userId}/relations")]
        public async Task<IActionResult> GetUserRelations(int userId)
        {
            var relations = await userService.GetUserRelationsAsync(userId);
            

            return Ok(relations);
        }

        [HttpPost("addnewrelation")]
        public async Task<IActionResult> AddNewRelationOrUpdateExistingRelation(UserRelationModel userRelationModel)
        {
            UserRelationEntity newUserRelation = conversions.ConversionToUserRelationEntity(userRelationModel);
            if (newUserRelation.PrimaryContact == true)
            {
                await userService.RemoveAllPrimaryContacts();
            }
            if (userRelationModel.Id == 0)
            {
                await userService.AddUserRelation(newUserRelation);

            }
            else
            {
                await userService.UpdateUserRelation(newUserRelation);
            }
            return Ok(true);
        }
        [HttpDelete("deleteuserrelation/{id}")]
        public async Task<IActionResult> DeleteUserRelation(int id)
        {
            await userService.DeleteUserById(id);
            return Ok(true);
        }


    }
}
