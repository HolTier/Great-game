using Great_game_API.DbModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace Great_game_API.Services
{
    public class Worker : BackgroundService
    {
        //private readonly GreatGameDataContext _context;
        private readonly IServiceProvider _services;
        //private readonly ILogger<Worker> _logger;

        public Worker(IServiceProvider services)
        {
            //_context = context;
            _services = services;
            //_logger = logger;
            
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {

            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _services.CreateScope())
                {
                    var _context = scope.ServiceProvider.GetRequiredService<GreatGameDataContext>();
                    var result = await _context.Games.Where(x => x.EndDate <= DateTime.Now && x.WinningNumbers == null).ToListAsync();
                    
                    if (result != null && (result as List<Game>).Count > 0)
                    {
                        
                        foreach (var game in result)
                        {
                            var rnd = new Random();
                            var numbers = Enumerable.Range(1, 50).OrderBy(x => rnd.Next()).Take(6).ToArray();
                            int[] winNum = numbers;

                            game.WinningNumbers = winNum;

                            var userGame = await _context.UserGames.Where(x => x.GameId == game.GameId).ToListAsync();
                            var prize = await _context.GameTypes.FindAsync(game.GameTypeId);

                            if(userGame != null && prize != null)
                            {
                                foreach (var user in userGame)
                                {
                                    var winner = await _context.Users.FindAsync(user.UserId);
                                    if (winner != null)
                                    {
                                        winner.Cash += prize.Prize;
                                        _context.Users.Update(winner);
                                    }
                                }
                            }
                            

                            _context.Games.Update(game);
                            await _context.SaveChangesAsync();
                        }
                    
                    }

                    //System.Diagnostics.Debug.WriteLine("Works at " + DateTime.Now);
                    System.Console.WriteLine("Worker works at " + DateTime.Now);

                    await Task.Delay(10000, stoppingToken);
                }
            }
        }
    }
}
