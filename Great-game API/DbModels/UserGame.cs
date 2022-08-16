using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Great_game_API.DbModels
{
    public class UserGame
    {
        [Key, Column(Order = 1)]
        public int UserId { get; set; }
        public User User { get; set; }

        [Key, Column(Order = 2)]
        public int GameId { get; set; }
        public Game Game { get; set; }

        public string? Status { get; set; }
        public float Prize { get; set; }
    }
}
