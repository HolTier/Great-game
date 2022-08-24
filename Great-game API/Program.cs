namespace Great_game_API;

public class Program
{
    public static async Task Main(string[] args)
    {
        // Build server instance from configuration in startup.cs
        var app = CreateHostBuilder(args).Build();
        // Running server
        await app.RunAsync();
    }

    public static IHostBuilder CreateHostBuilder(string[] args)
    {
        return Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
    }
}
