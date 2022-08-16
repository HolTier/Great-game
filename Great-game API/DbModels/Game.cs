using System.ComponentModel.DataAnnotations;

namespace Great_game_API.DbModels
{
    public class Game
    {
        public int GameId { get; set; }
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        public int GameTypeId { get; set; }
        public GameType GameType { get; set; }

        public ICollection<UserGame> UserGames { get; set; }

    }
}
