namespace Great_game_API.ModelDto
{
    public class ForceWinDto
    {
        public int GameId { get; set; }
        public int[] WinningNumbers { get; set; } = null!;
    }
}
