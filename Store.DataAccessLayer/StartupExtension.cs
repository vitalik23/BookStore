using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Store.DataAccessLayer.AppContext;
using Store.DataAccessLayer.Entities;
using Store.DataAccessLayer.Initialization;
using Store.DataAccessLayer.Repositories.Interfaces;
using Store.Shared.Constants;

namespace Store.DataAccessLayer
{
    public static class StartupExtension
    {
        public static void DataAccessInitializer(this IServiceCollection services, IConfiguration configuration)
        {


            string stringConnection = configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<ApplicationContext>(options =>
                options.UseSqlServer(stringConnection, x => x.MigrationsAssembly("Store.DataAccessLayer")));

            services.AddIdentityCore<User>(opts =>
            {

                opts.Password.RequiredLength = Constants.Password.MIN_LENGTH_PASSWORD;
                opts.Password.RequireNonAlphanumeric = false;
                opts.Password.RequireLowercase = false;
                opts.Password.RequireUppercase = false;
                opts.Password.RequireDigit = false;

                opts.User.RequireUniqueEmail = true;
                opts.User.AllowedUserNameCharacters = Constants.Password.PASSWORD_VALID;

            })

                .AddRoles<IdentityRole>()
                .AddSignInManager()
                .AddEntityFrameworkStores<ApplicationContext>();


            services.Scan(scan => scan
           .FromAssemblyOf<IUserRepository>()
             .AddClasses(classes => classes.InNamespaces("Store.DataAccessLayer.Repositories.EFRepositories"))
                 .AsImplementedInterfaces()
                 .WithTransientLifetime());

            DataBaseInitialization.InitializeAsync(services).Wait();

        }
    }
}
