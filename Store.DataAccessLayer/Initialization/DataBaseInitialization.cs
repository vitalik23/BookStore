using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Store.DataAccessLayer.Entities;
using Store.Shared.Common.Exceptions;
using Store.Shared.Constants;
using Store.Shared.Enums;
using System.Threading.Tasks;

namespace Store.DataAccessLayer.Initialization
{
    public static class DataBaseInitialization
    {
        public static async Task InitializeAsync(this IServiceCollection service)
        {
            var roleManager = service.BuildServiceProvider().GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = service.BuildServiceProvider().GetRequiredService<UserManager<User>>();

            string adminEmail = "admin@gmail.com";
            string password = "password";

            if (!await roleManager.RoleExistsAsync(Enums.UserRoles.Admin.ToString()))
            {
                var adminRole = new IdentityRole
                {
                    Name = Enums.UserRoles.Admin.ToString(),
                    NormalizedName = Enums.UserRoles.Client.ToString().ToUpper()
                };
                await roleManager.CreateAsync(adminRole);
            }
            if (!await roleManager.RoleExistsAsync(Enums.UserRoles.Client.ToString()))
            {
                var clientRole = new IdentityRole
                {
                    Name = Enums.UserRoles.Client.ToString(),
                    NormalizedName = Enums.UserRoles.Client.ToString().ToUpper()
                };
                await roleManager.CreateAsync(clientRole);
            }

            if (await userManager.FindByNameAsync(adminEmail) is null)
            {

                var admin = new User
                {
                    Email = adminEmail,
                    UserName = adminEmail,
                    EmailConfirmed = true,
                    FirstName = "Admin",
                    LastName = "Admin"
                };

                var resultCreate = await userManager.CreateAsync(admin, password);

                if (!resultCreate.Succeeded)
                {
                    throw new ServerException(Constants.Errors.USER_NOT_REGISTERED);
                }

                var resultAddTooRole = await userManager.AddToRoleAsync(admin, Enums.UserRoles.Admin.ToString());

                if (!resultAddTooRole.Succeeded)
                {
                    throw new ServerException(Constants.Errors.USER_NOT_ADDED_TO_ROLE);
                }

            }

        }

        public static void InitializeDBAuthorAndPrintingEdition(this ModelBuilder builder)
        {
            var author = new Author
            {
                Id = 1,
                Name = "Pushkin"
            };

            var printingEdition = new PrintingEdition
            {
                Id = 1,
                Title = "Captain's daughter",
                Description = "Roman is very interesting",
                Price = 110,
                Currency = Enums.CurrencyType.USD,
                Type = Enums.PrintingType.Book,
                Subtitle = "Printing edition"
            };

            var authorInPrintingEdition = new AuthorInPrintingEdition
            {
                AuthorId = author.Id,
                PrintingEditionId = printingEdition.Id
            };

            builder.Entity<Author>().HasData(author);
            builder.Entity<PrintingEdition>().HasData(printingEdition);
            builder.Entity<AuthorInPrintingEdition>().HasData(authorInPrintingEdition);

        }

    }
}
