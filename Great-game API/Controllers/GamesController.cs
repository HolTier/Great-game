using Great_game_API.DbModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Great_game_API.ModelDto;


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
                //checks if the game type is correct
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
            //var win = _context.;
            var result = await _context.Games.ToListAsync();
            return new JsonResult(result);
        }

        [HttpGet("GetTypes")]
        public async Task<IActionResult> GetTypesAsync()
        {
            var result = await _context.GameTypes.ToListAsync();
            return new JsonResult(result);
        }

        [HttpDelete("DeleteGame/{id}")]
        public async Task<IActionResult> DeleteGamesAsync(int id)
        {
            if(id == 0)
            {
                return BadRequest();
            }
            {
                //checks if it exists
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

        [HttpDelete("DeleteType/{id}")]
        public async Task<IActionResult> DeleteTypeAsync(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }
            {
                //checks if it exists
                var result = await _context.GameTypes.FindAsync(id);
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
                (x.StartDate <= DateTime.Now) && (x.EndDate >= DateTime.Now))//Check date
                .ToListAsync();

            //checks if it exists
            if (result == null)
            {
                return NotFound();
            }
            else
            {
                return new JsonResult(result);
            }
        }

        [HttpGet("ActiveGamesUser/{username}")]
        public async Task<IActionResult> GetActiveGamesAsync(string username)
        {
            //checks if it exists
            var user = await _context.Users.FirstAsync(x => x.UserName == username);
            if(user == null)
            {
                return NotFound();
            }

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
                    gt.Cost


                })
                .Where(x =>
                ((x.StartDate <= DateTime.Now) && (x.EndDate >= DateTime.Now))&& //Check date
                (!_context.UserGames.Any(ug => ug.UserId == user.Id && ug.GameId == x.GameId)))
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

        [HttpGet("ArchiveGames/{username}")]
        public async Task<IActionResult> GetArchiveGamesAsync(string username)
        {
            //checks if it exists
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
                    gt.Cost
                })
                .Where(y => y.UserId == user.Id) //Bierze wszystkie gry uzytkownika
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
                //checks if it exists
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
                //checks if it exists
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

                    var userGame = await _context.UserGames.Where(x => x.GameId == result.GameId).ToListAsync();

                    if(userGame != null)
                    {
                        var prize = await _context.GameTypes.FindAsync(result.GameTypeId);
                        if(prize == null)
                        {
                            return BadRequest(prize);
                        }

                        foreach(var game in userGame)
                        {
                            var winner = await _context.Users.FindAsync(game.UserId);
                            if(winner != null)
                            {
                                winner.Cash += prize.Prize;
                                _context.Users.Update(winner);
                            }
                        }
                    }

                    _context.Games.Update(result);
                    await _context.SaveChangesAsync();

                    return Ok();
                }
            }
        }

    }
}
