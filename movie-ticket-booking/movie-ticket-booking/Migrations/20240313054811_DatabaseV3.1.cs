using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace movie_ticket_booking.Migrations
{
    /// <inheritdoc />
    public partial class DatabaseV31 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "totalAmount",
                table: "BookingOrders",
                newName: "TotalAmount");

            migrationBuilder.AddColumn<string>(
                name: "RazorPayPaymentId",
                table: "BookingOrders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "BookingOrders",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RazorPayPaymentId",
                table: "BookingOrders");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "BookingOrders");

            migrationBuilder.RenameColumn(
                name: "TotalAmount",
                table: "BookingOrders",
                newName: "totalAmount");
        }
    }
}
