using System.ComponentModel.DataAnnotations;

namespace Great_game_API.DbModels
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;
        public float Cash { get; set; }
        public float Balance { get; set; }
        public string? Role { get; set; }

        public ICollection<UserGame> UserGames { get; set; }

    }
}
