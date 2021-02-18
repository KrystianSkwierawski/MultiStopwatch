using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Project.Infrastructure.Persistence.Migrations
{
    public partial class AddProjectItems : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProjectItemsId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "StopWatchItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Time = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StopWatchItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProjectItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    StopWatchItemId = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectItems_StopWatchItems_StopWatchItemId",
                        column: x => x.StopWatchItemId,
                        principalTable: "StopWatchItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_ProjectItemsId",
                table: "AspNetUsers",
                column: "ProjectItemsId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectItems_StopWatchItemId",
                table: "ProjectItems",
                column: "StopWatchItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_ProjectItems_ProjectItemsId",
                table: "AspNetUsers",
                column: "ProjectItemsId",
                principalTable: "ProjectItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_ProjectItems_ProjectItemsId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "ProjectItems");

            migrationBuilder.DropTable(
                name: "StopWatchItems");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_ProjectItemsId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ProjectItemsId",
                table: "AspNetUsers");
        }
    }
}
