using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Great_game_API.DbModels
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;
        public float Cash { get; set; } = 0;
        public float Balance { get; set; } = 0;
        public int RoleId { get; set; } = 2;
        [JsonIgnore]
        public Role Role { get; set; }

        [JsonIgnore]
        public ICollection<UserGame>? UserGames { get; set; }

    }
}
