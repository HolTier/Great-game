using System.ComponentModel.DataAnnotations;

namespace Great_game_API.DbModels
{
    public class GameType
    {
        public int GameTypeId { get; set; }
        [Required]
        public string GameName { get; set; } = null!;
        public float TotalPrize { get; set; }
        public ICollection<Game> Games { get; set; }

    }
}
