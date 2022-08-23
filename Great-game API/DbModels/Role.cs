using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace Great_game_API.DbModels
{
    public class Role
    {
        public int RoleId { get; set; }
        [Required]
        public string RoleName { get; set; }
        [JsonIgnore]
        public ICollection<User> Users { get; set; }
    }
}
