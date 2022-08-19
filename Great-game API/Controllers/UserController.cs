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
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == login.UserName);
                if(user == null)
                {
                    return NotFound();
                }
                else
                {
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
                    var newUser = await _context.Users.FirstOrDefaultAsync(x => x.UserName == login.UserName);

                    await _context.SaveChangesAsync();
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


    }
}
