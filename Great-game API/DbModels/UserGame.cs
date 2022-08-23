using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Great_game_API.DbModels
{
    public class UserGame
    {
        [Key, Column(Order = 1)]
        public int UserId { get; set; }
        [JsonIgnore]
        public User? User { get; set; }

        [Key, Column(Order = 2)]
        public int GameId { get; set; }
        [JsonIgnore]
        public Game? Game { get; set; }
        public int[]? UserNumbers { get; set; }

    }
}
