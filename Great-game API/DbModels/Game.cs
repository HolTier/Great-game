using System.ComponentModel.DataAnnotations;
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
        public GameType GameType { get; set; }

        [JsonIgnore]
        public ICollection<UserGame> UserGames { get; set; }

    }
}
