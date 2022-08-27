using Great_game_API.DbModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace Great_game_API.Services
{
    //Add worker who checks if the game is overdue and draws the winning numbers
    public class Worker : BackgroundService
    {
        private readonly IServiceProvider _services;

        public Worker(IServiceProvider services)
        { 
            _services = services;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {

            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _services.CreateScope())//creates a scope to be able to use the database
                {
                    var _context = scope.ServiceProvider.GetRequiredService<GreatGameDataContext>();
                    //looking for expired games
                    var result = await _context.Games.Where(x => x.EndDate <= DateTime.Now && x.WinningNumbers == null).ToListAsync();
                    
                    if (result != null && (result as List<Game>).Count > 0)
                    {
                        
                        foreach (var game in result)
                        {
                            //draws the winning numbers
                            var rnd = new Random();
                            var numbers = Enumerable.Range(1, 50).OrderBy(x => rnd.Next()).Take(6).ToArray();
                            int[] winNum = numbers;

                            game.WinningNumbers = winNum;

                            var userGame = await _context.UserGames.Where(x => x.GameId == game.GameId).ToListAsync();
                            var prize = await _context.GameTypes.FindAsync(game.GameTypeId);

                            //for each user who won, he adds a reward to his account
                            if (userGame != null && prize != null)
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

                    System.Console.WriteLine("Worker works at " + DateTime.Now);

                    await Task.Delay(10000, stoppingToken);
                }
            }
        }
    }
}
