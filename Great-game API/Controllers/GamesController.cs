using Great_game_API.DbModels;
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
    public class GamesController : ControllerBase
    {
        private readonly GreatGameDataContext _context;

        public GamesController(GreatGameDataContext context)
        {
            _context = context;
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Add(Game game)
        {
            if(game == null)
            {
                return BadRequest();
            }
            else
            {
                await _context.Games.AddAsync(game);
                await _context.SaveChangesAsync();
                return Ok();
            }
        }
    }
}
