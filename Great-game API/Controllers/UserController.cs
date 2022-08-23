using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Great_game_API.DbModels;
using Microsoft.EntityFrameworkCore;
using Great_game_API.ModelDto;
using Great_game_API.Repository;

namespace Great_game_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly GreatGameDataContext _context;

        public UserController(GreatGameDataContext context)
        {
            _context = context;
        }

        //Create
        [HttpPost("Create")]
        public async Task<IActionResult> CreatedUserAsync(User user)
        {
            if(user == null)
            {
                return BadRequest();
            }
            else
            {
                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();
                return Ok();
            }
        }

        //Login
        [HttpPost("Login")]
        public async Task<IActionResult> LoginAsync(LoginDto login)
        {
            if(login == null)
            {
                return BadRequest();
            }
            else
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == login.UserName && x.Password == login.Password);
                if(user == null)
                {
                    return NotFound();
                }
                else
                {
                    
                    //var json = new JsonResult(user);
                    return new JsonResult(user);
                }
            }
        }

        //Register
        [HttpPost("Register")]
        public async Task<IActionResult> RegisterAsync(LoginDto login)
        {
            if (login == null)
            {
                return BadRequest();
            }
            else
            {
                
                User user = new User()
                {
                    UserName = login.UserName,
                    Password = login.Password,
                };
                var result = await _context.Users.FirstOrDefaultAsync(x => x.UserName == user.UserName);
                if (result == null)
                {
                    await _context.Users.AddAsync(user);
                    await _context.SaveChangesAsync();

                    var newUser = await _context.Users.FirstOrDefaultAsync(x => x.UserName == login.UserName);
                    return new JsonResult(newUser);
                }
                else
                {
                    return BadRequest();
                }
                
            }
        }

        //Edit user
        [HttpPost("EditUser")]
        public async Task<IActionResult> EditUserAsync(User user)
        {
            if(user == null)
            { 
                return BadRequest();
            }
            else
            {
                var result = await _context.Users.FindAsync(user.Id);

                if(user == null)
                {
                    return NotFound();
                }
                else
                {
                    result = user;
                    await _context.SaveChangesAsync();
                    return new JsonResult(result);
                }
            }
        }

        //Get all
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllUserAsync()
        {
            var result = await _context.Users.ToListAsync();
            return new JsonResult(result);
        }

        //Get user by id
        [HttpGet("GetUser/{id}")]
        public async Task<IActionResult> GetUserByIdAsync(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);

            if (user == null)
            {
                return NotFound();
            }
            else 
            { 
                return new JsonResult(user);
            }
        }

        [HttpGet("GetUserName/{username}")]
        public async Task<IActionResult> GetUserByNameAsync(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == username);

            if (user == null)
            {
                return NotFound();
            }
            else
            {
                return new JsonResult(user);
            }
        }

        //Delete user
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteUserByIdAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if(user == null)
            {
                return NotFound();
            }
            else
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
                return Ok();
            }
        }

        [HttpDelete("DeleteName/{username}")]
        public async Task<IActionResult> DeleteUserByNameAsync(string username)
        {
            var user = await _context.Users.FirstAsync(x => x.UserName == username);

            if (user == null)
            {
                return NotFound();
            }
            else
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
                return Ok();
            }
        }

        [HttpPut("ChangeUsername")]
        public async Task<IActionResult> ChangeUsernameAsync(ChangeUsernameDto changeUsername)
        {
            if(changeUsername == null)
            {
                return BadRequest();
            }
            else
            {
                var result = await _context.Users.FirstAsync(x => x.UserName == changeUsername.OldUsername);
                if(result == null)
                {
                    return NotFound();
                }
                else
                {
                    result.UserName = changeUsername.NewUsername;
                    _context.Users.Update(result);
                    await _context.SaveChangesAsync();
                    return Ok();
                }
            }
        }

        [HttpPut("ChangePassword")]
        public async Task<IActionResult> ChangePasswordAsync(ChangePasswordDto changePassword)
        {
            if (changePassword == null)
            {
                return BadRequest();
            }
            else
            {
                var result = await _context.Users.FirstAsync(x => x.UserName == changePassword.Username);
                if (result == null)
                {
                    return NotFound();
                }
                else
                {
                    result.Password = changePassword.Password;
                    _context.Users.Update(result);
                    await _context.SaveChangesAsync();
                    return Ok();
                }
            }
        }

        [HttpPut("AddCash")]
        public async Task<IActionResult> AddCashAsync(AddCashDto cash)
        {
            if (cash == null)
            {
                return BadRequest();
            }
            else
            {
                var result = await _context.Users.FirstAsync(x => x.UserName == cash.Username);
                if (result == null)
                {
                    return NotFound();
                }
                else
                {
                    result.Cash += cash.Cash;
                    _context.Users.Update(result);
                    await _context.SaveChangesAsync();
                    return Ok();
                }
            }
        }

        [HttpPut("ChangeRole")]
        public async Task<IActionResult> ChangeRoleAsync(ChangeRoleDto changeRole)
        {
            if (changeRole == null)
            {
                return BadRequest();
            }
            else
            {
                var result = await _context.Users.FirstAsync(x => x.UserName == changeRole.Username);
                if (result == null)
                {
                    return NotFound();
                }
                else
                {
                    result.RoleId = changeRole.RoleId;
                    _context.Users.Update(result);
                    await _context.SaveChangesAsync();
                    return Ok();
                }
            }
        }

        [HttpGet("Roles")]
        public async Task<IActionResult> GetRolesAsync()
        {
            var result = await _context.Roles.ToListAsync();
            return new JsonResult(result);
        }

        [HttpPost("AddUserGame")]
        public async Task<IActionResult> AddUserGameAsync(AddUserGameDto addUserGame)
        {
            if(addUserGame == null)
            { 
                return BadRequest();
            }
            else
            {
                
                var result = await _context.Users.FirstAsync(x => x.UserName == addUserGame.UserName);

                if(result == null)
                {
                    return NotFound(result);
                }
                else
                {
                    var type = await _context.GameTypes.FindAsync(addUserGame.GameTypeId);

                    if(type == null)
                    {
                        return NotFound(type);
                    }

                    if(type.Cost > result.Cash)
                    {
                        return BadRequest("No cash");
                    }

                    result.Cash -= type.Cost;

                    UserGame userGame = new UserGame()
                    {
                        UserId = result.Id,
                        GameId = addUserGame.GameId,
                        UserNumbers = addUserGame.UserNumbers
                    };

                    _context.Users.Update(result);
                    await _context.UserGames.AddAsync(userGame);
                    await _context.SaveChangesAsync();
                    
                    return Ok();
                }                
            }
        }

        [HttpGet("GetUserGames/{username}")]
        public async Task<IActionResult> GetUserGamesAsync(string username)
        {
            var result = _context.Users.FirstOrDefault(x => x.UserName == username);

            if(result == null)
            {
                return BadRequest();
            }
            else
            {
                var userGames = await _context.UserGames.Where(x => x.UserId == result.Id).ToListAsync();
                if(userGames == null)
                {
                    return NotFound();
                }
                else
                {
                    return new JsonResult(userGames);
                }
            }
        }
    }

    
    
}
