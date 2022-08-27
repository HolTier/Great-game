using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Great_game_API.Migrations
{
    public partial class Data : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Games",
                keyColumn: "GameId",
                keyValue: 1,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2022, 9, 6, 11, 0, 18, 502, DateTimeKind.Local).AddTicks(2840), new DateTime(2022, 8, 27, 11, 0, 18, 502, DateTimeKind.Local).AddTicks(2797) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Games",
                keyColumn: "GameId",
                keyValue: 1,
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2022, 9, 6, 10, 59, 34, 448, DateTimeKind.Local).AddTicks(5573), new DateTime(2022, 8, 27, 10, 59, 34, 448, DateTimeKind.Local).AddTicks(5541) });
        }
    }
}
