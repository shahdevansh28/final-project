using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace movie_ticket_booking.Migrations
{
    /// <inheritdoc />
    public partial class DatabaseV12 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Capacity",
                table: "Theaters");

            migrationBuilder.AddColumn<int>(
                name: "Capacity",
                table: "ShowTimes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Capacity",
                table: "ShowTimes");

            migrationBuilder.AddColumn<int>(
                name: "Capacity",
                table: "Theaters",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
