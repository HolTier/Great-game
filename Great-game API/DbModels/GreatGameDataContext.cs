using Microsoft.EntityFrameworkCore;

namespace Great_game_API.DbModels
{
    public class GreatGameDataContext : DbContext
    {
        public GreatGameDataContext(DbContextOptions<GreatGameDataContext> options)
            : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<GameType> GameTypes { get; set; }
        public DbSet<UserGame> UserGames { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<UserGame>()
                .HasKey(ug => new { ug.UserId, ug.GameId });
            modelBuilder.Entity<UserGame>()
                .HasOne(ug => ug.User)
                .WithMany(u => u.UserGames)
                .HasForeignKey(ug => ug.UserId);
            modelBuilder.Entity<UserGame>()
                .HasOne(ug => ug.Game)
                .WithMany(g => g.UserGames)
                .HasForeignKey(ug => ug.GameId);
            modelBuilder.Entity<Game>()
            .HasMany(g => g.UserGames)
            .WithOne(ug => ug.Game)
            .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.UseSerialColumns();
        }

        
    }
}
