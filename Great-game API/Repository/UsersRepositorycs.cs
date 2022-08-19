using Great_game_API.DbModels;
using Great_game_API.ModelDto;
using Microsoft.EntityFrameworkCore;

namespace Great_game_API.Repository
{
    public class UserRepository
    {
        private readonly GreatGameDataContext _context;



        public UserRepository(GreatGameDataContext context)
        {
            _context = context;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task AddUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
        }

        public async Task<User?> GetUserByNameAsync(LoginDto login)
        {
            return await _context.Users.FirstAsync(x => x.UserName == login.UserName && x.Password == login.Password);
        }

        public async Task<User?> GetUserByName(int id)
        {
            return await _context.Users.FindAsync(id);
        }
    }
}
