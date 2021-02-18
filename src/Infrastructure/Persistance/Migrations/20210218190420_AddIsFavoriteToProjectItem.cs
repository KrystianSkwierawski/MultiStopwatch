using Microsoft.EntityFrameworkCore.Migrations;

namespace Project.Infrastructure.Persistence.Migrations
{
    public partial class AddIsFavoriteToProjectItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsFavorite",
                table: "ProjectItems",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFavorite",
                table: "ProjectItems");
        }
    }
}
