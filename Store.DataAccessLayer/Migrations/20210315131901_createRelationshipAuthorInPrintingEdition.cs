using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Store.DataAccessLayer.Migrations
{
    public partial class createRelationshipAuthorInPrintingEdition : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AuthorInPrintingEditions",
                columns: new[] { "AuthorId", "PrintingEditionId" },
                values: new object[] { 1L, 1L });

            migrationBuilder.UpdateData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 1L,
                column: "CreateDate",
                value: new DateTime(2021, 3, 15, 15, 19, 0, 797, DateTimeKind.Local).AddTicks(126));

            migrationBuilder.UpdateData(
                table: "PrintingEditions",
                keyColumn: "Id",
                keyValue: 1L,
                column: "CreateDate",
                value: new DateTime(2021, 3, 15, 15, 19, 0, 799, DateTimeKind.Local).AddTicks(4977));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AuthorInPrintingEditions",
                keyColumns: new[] { "AuthorId", "PrintingEditionId" },
                keyValues: new object[] { 1L, 1L });

            migrationBuilder.UpdateData(
                table: "Authors",
                keyColumn: "Id",
                keyValue: 1L,
                column: "CreateDate",
                value: new DateTime(2021, 3, 15, 15, 11, 53, 598, DateTimeKind.Local).AddTicks(5864));

            migrationBuilder.UpdateData(
                table: "PrintingEditions",
                keyColumn: "Id",
                keyValue: 1L,
                column: "CreateDate",
                value: new DateTime(2021, 3, 15, 15, 11, 53, 600, DateTimeKind.Local).AddTicks(9674));
        }
    }
}
