using Genogram.Application.Projections;
using Genogram.Application.Services;
using Genogram.Domain.Entites;
using Genogram.Domain.Interfaces.Services;
using Genogram.Domain.Models.Services.User;
using Genogram.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace Genogram_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService userService;
        private readonly Conversions conversions;
        public UserController(IUserService userService,Conversions conversions)
        {
            this.userService = userService;
            this.conversions = conversions;
        }

        [HttpGet("getallusers")]
        public async Task<IActionResult> GetAllUser()
        {
            List<UserEntity> users = await userService.GetAllUsers();
            return Ok(users);
        }


        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserById(int userId)
        {
            var user = await userService.GetUserAsync(userId);
            if (user == null)
            {
                return NotFound($"No User Found");
            }

            return Ok(user);
        }

        [HttpPost("addnewuser")]
        public async Task<IActionResult> AddNewUserOrUpdateExistingUser(UserModel userModel)
        {
            UserEntity newUser = conversions.ConversionToUserEntity(userModel);
            
            if (newUser.Id == 0)
            {
                await userService.AddUser(newUser);

            }
            else
            {
                await userService.UpdateUser(newUser);
            }
            return Ok(true);
        }


    }
}
