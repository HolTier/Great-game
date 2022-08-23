using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Great_game_API.DbModels
{
    public class Game
    {
        public int GameId { get; set; }
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        public int GameTypeId { get; set; }
        [JsonIgnore]
        public GameType GameType { get; set; }
        public int[]? WinningNumbers { get; set; }

        [JsonIgnore]
        public ICollection<UserGame> UserGames { get; set; }


    }
}
