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

        [HttpPost("AddGame")]
        public async Task<IActionResult> AddGameAsync(AddGameDto game)
        {
            if(game == null)
            {
                return BadRequest();
            }
            else
            {
                var type = await _context.GameTypes.FirstOrDefaultAsync(x => x.GameTypeId == game.Type);
                if(type == null)
                {
                    return NotFound("Bad type");
                }

                Game newGame = new Game(){
                    StartDate = game.Start,
                    EndDate = game.End,
                    GameTypeId = type.GameTypeId
                };

                await _context.Games.AddAsync(newGame);
                await _context.SaveChangesAsync();
                return Ok();
            }
        }

        [HttpPost("AddType")]
        public async Task<IActionResult> AddTypeAsync(AddTypeDto type)
        {
            if(type == null)
            {
                return BadRequest();
            }
            else
            {
                GameType newType = new GameType()
                {
                    GameName = type.GameName,
                    Prize = type.Prize,
                    Cost = type.Cost,
                };
                await _context.GameTypes.AddAsync(newType);
                await _context.SaveChangesAsync();
                return Ok();
            }
        }

        [HttpGet("GetGames")]
        public async Task<IActionResult> GetGamesAsync()
        {
            var result = await _context.Games.ToListAsync();
            return new JsonResult(result);
        }

        [HttpGet("GetTypes")]
        public async Task<IActionResult> GetTypesAsync()
        {
            var result = await _context.GameTypes.ToListAsync();
            return new JsonResult(result);
        }

        [HttpDelete("DeleteGames/{id}")]
        public async Task<IActionResult> DeleteGamesAsync(int id)
        {
            if(id == 0)
            {
                return BadRequest();
            }
            {
                var result = await _context.Games.FindAsync(id);
                if(result == null)
                {
                    return NotFound();
                }

                _context.Games.Remove(result);
                await _context.SaveChangesAsync();
                return Ok();
            }
        }

        [HttpDelete("DeleteType/{name}")]
        public async Task<IActionResult> DeleteTypeAsync(string name)
        {
            if (name == null)
            {
                return BadRequest();
            }
            {
                var result = await _context.GameTypes.FirstAsync(x => x.GameName == name);
                if (result == null)
                {
                    return NotFound();
                }

                _context.GameTypes.Remove(result);
                await _context.SaveChangesAsync();
                return Ok();
            }
        }

        [HttpGet("ActiveGames")]
        public async Task<IActionResult> GetActiveGamesAsync()
        {
            var result = await _context.Games
                .Join(_context.GameTypes, //Join GameTypes to Games
                g => g.GameTypeId,
                gt => gt.GameTypeId,
                (g, gt) => new 
                {
                    g.GameId,
                    gt.GameTypeId,
                    gt.GameName,
                    g.StartDate,
                    g.EndDate,
                    gt.Prize,

                })
                .Where(x => 
                (x.StartDate <= DateTime.Now) && (x.EndDate >= DateTime.Now)) //Check date
                .ToListAsync();

            if(result == null)
            {
                return NotFound();
            }
            else
            {
                return new JsonResult(result);
            }
        }

        [HttpGet("ArchiveGames/{username}")]
        public async Task<IActionResult> GetArchiveGamesAsync(string username)
        {
            var user = await _context.Users.FirstAsync(x => x.UserName == username);
            if (user == null)
            {
                return NotFound();
            }
            var result = await _context.Games
                .Join(_context.UserGames, //Join UserGames to games
                g => g.GameId,
                ug => ug.GameId,
                (g, ug) => new
                {
                    g.GameId,
                    ug.UserId,
                    g.StartDate,
                    g.EndDate,
                    ug.UserNumbers,
                    g.WinningNumbers,
                    g.GameTypeId
                })
                .Join(_context.GameTypes, //Join GameTypes
                gug => gug.GameTypeId,
                gt => gt.GameTypeId,
                (gug, gt) => new 
                {
                    gug.GameId,
                    gug.UserId,
                    gug.StartDate,
                    gug.EndDate,
                    gug.UserNumbers,
                    gug.WinningNumbers,
                    gug.GameTypeId,
                    gt.GameName,
                    gt.Prize,
                })
                .Where(y => y.StartDate < DateTime.Now && y.EndDate < DateTime.Now && //Check date
                (y.UserNumbers != null && y.UserNumbers.Length == 6 )&& //Check user number lenght 
                (y.WinningNumbers != null && y.WinningNumbers.Length == 6)) //Check winning numbers length
                .ToListAsync();

            if (result == null)
            {
                return NotFound();
            }
            else
            {
                return new JsonResult(result);
            }
        }

        [HttpPut("EditType")]
        public async Task<IActionResult> EditTypeAsync(GameType type)
        {
            if(type == null)
            {
                return BadRequest(type);
            }
            else
            {
                var result = await _context.GameTypes.FindAsync(type.GameTypeId);
                if(result == null)
                {
                    return NotFound();
                }
                else
                {
                    if(type.GameName != null && type.GameName != string.Empty)
                        result.GameName = type.GameName;

                    result.Prize = type.Prize;
                    result.Cost = type.Cost;

                    _context.GameTypes.Update(result);
                    await _context.SaveChangesAsync();

                    return Ok();
                }
            }
        }

        [HttpPut("ForceWin")]
        public async Task<IActionResult> ForceWinGame(ForceWinDto winDto)
        {
            if(winDto == null)
            {
                return BadRequest();
            }
            else
            {
                var result = await _context.Games.FindAsync(winDto.GameId);
                if(result == null)
                {
                    return NotFound();
                }
                else
                {
                    result.WinningNumbers = winDto.WinningNumbers;
                    result.EndDate = DateTime.Now;
                    //result.EndDate.AddDays();

                    _context.Games.Update(result);
                    await _context.SaveChangesAsync();

                    return Ok();
                }
            }
        }

    }
}
