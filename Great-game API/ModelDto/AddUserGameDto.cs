namespace Great_game_API.ModelDto
{
    public class AddUserGameDto
    {
        public int GameId { get; set; }
        public string UserName { get; set; }
        public int GameTypeId { get; set; }
        public int[] UserNumbers { get; set; }
    }
}
