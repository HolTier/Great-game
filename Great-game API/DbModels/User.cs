using System.ComponentModel.DataAnnotations;

namespace Great_game_API.DbModels
{
    public class User
    {
        public int UserID { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        public float Cash { get; set; }
    }
}
