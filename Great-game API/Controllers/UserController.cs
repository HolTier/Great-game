using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Great_game_API.DbModels;

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
    }
}
