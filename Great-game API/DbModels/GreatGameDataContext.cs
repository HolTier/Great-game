using Microsoft.EntityFrameworkCore;

namespace Great_game_API.DbModels
{
    public class GreatGameDataContext : DbContext
    {
        public GreatGameDataContext(DbContextOptions<GreatGameDataContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseSerialColumns();
        }

        public DbSet<User> Users { get; set; }
    }
}
