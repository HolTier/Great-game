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
        public DbSet<Role> Roles { get; set; }
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

            modelBuilder.Entity<Game>()
                .Property(x => x.StartDate)
                .HasColumnType("date");

            modelBuilder.Entity<Game>()
                .Property(x => x.EndDate)
                .HasColumnType("date");

            modelBuilder.Entity<Role>()
                .HasData(
                    new Role { RoleId = 1, RoleName = "Admin"},
                    new Role { RoleId = 2, RoleName = "User"}
                );

            modelBuilder.Entity<User>()
                .HasData(
                    new User { Id = 1, UserName = "Admin", Password = "Admin", Cash = 100000, RoleId = 1 }
                );

            modelBuilder.Entity<GameType>()
                .HasData(
                    new GameType { GameTypeId=1, GameName="Standart", Cost=2, Prize=10000 }
                );

            modelBuilder.Entity<Game>()
                .HasData(
                    new Game { GameId = 1, GameTypeId = 1, StartDate = DateTime.Now, EndDate = DateTime.Now.AddDays(10) }
                );

            modelBuilder.UseSerialColumns();

            
        }

        
    }
}
