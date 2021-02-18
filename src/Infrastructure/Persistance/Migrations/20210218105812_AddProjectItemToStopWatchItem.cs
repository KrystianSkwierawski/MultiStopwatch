using Microsoft.EntityFrameworkCore.Migrations;

namespace Project.Infrastructure.Persistence.Migrations
{
    public partial class AddProjectItemToStopWatchItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectItems_StopWatchItems_StopWatchItemId",
                table: "ProjectItems");

            migrationBuilder.DropIndex(
                name: "IX_ProjectItems_StopWatchItemId",
                table: "ProjectItems");

            migrationBuilder.DropColumn(
                name: "StopWatchItemId",
                table: "ProjectItems");

            migrationBuilder.AddColumn<int>(
                name: "ProjectItemId",
                table: "StopWatchItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_StopWatchItems_ProjectItemId",
                table: "StopWatchItems",
                column: "ProjectItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_StopWatchItems_ProjectItems_ProjectItemId",
                table: "StopWatchItems",
                column: "ProjectItemId",
                principalTable: "ProjectItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StopWatchItems_ProjectItems_ProjectItemId",
                table: "StopWatchItems");

            migrationBuilder.DropIndex(
                name: "IX_StopWatchItems_ProjectItemId",
                table: "StopWatchItems");

            migrationBuilder.DropColumn(
                name: "ProjectItemId",
                table: "StopWatchItems");

            migrationBuilder.AddColumn<int>(
                name: "StopWatchItemId",
                table: "ProjectItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ProjectItems_StopWatchItemId",
                table: "ProjectItems",
                column: "StopWatchItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectItems_StopWatchItems_StopWatchItemId",
                table: "ProjectItems",
                column: "StopWatchItemId",
                principalTable: "StopWatchItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
