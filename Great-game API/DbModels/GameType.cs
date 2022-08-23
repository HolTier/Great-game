using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Great_game_API.DbModels
{
    public class GameType
    {
        public int GameTypeId { get; set; }
        [Required]
        public string GameName { get; set; } = null!;
        public float Prize { get; set; }
        public float Cost { get; set; }
        [JsonIgnore]
        public ICollection<Game> Games { get; set; }

    }
}
