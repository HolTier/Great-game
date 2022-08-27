using Great_game_API.DbModels;
using Great_game_API.Services;
using Microsoft.EntityFrameworkCore;

namespace Great_game_API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSwaggerGen();
            services.AddDbContext<GreatGameDataContext>(
                o => o.UseNpgsql(Configuration.GetConnectionString("GreatGameDb")));

            //Add worker who checks if the game is overdue and draws the winning numbers
            //Check Services/Worker.cs
            services.AddHostedService<Worker>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Configure the HTTP request pipeline.
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }
    }
}
