using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Store.BusinessLogicLayer.Mapper;
using Store.BusinessLogicLayer.Providers;
using Store.BusinessLogicLayer.Services;
using Store.BusinessLogicLayer.Services.Interfaces;

namespace Store.BusinessLogicLayer
{
    public static class StartupExtension
    {
        public static void BusinessLogicInitializer(this IServiceCollection services, IConfiguration configuration)
        {



            services.Scan(sc =>
                    sc.FromCallingAssembly()
                    .FromAssemblies(
                        typeof(IAuthorService).Assembly,
                        typeof(AuthorService).Assembly)
                    .AddClasses()
                    .AsImplementedInterfaces()
                    );

            services.Scan(scan => scan
            .FromAssemblyOf<EmailProvider>()
              .AddClasses()
                .AsSelf()
                .WithTransientLifetime());

            services.AddHttpContextAccessor();

            var mapperConfig = new MapperConfiguration(config =>
            {
                config.AddProfile(new PrintingEditionProfile());
                config.AddProfile(new UserProfile());
                config.AddProfile(new AuthorProfile());
                config.AddProfile(new OrderProfile());
                config.AddProfile(new RegisterProfile());
                config.AddProfile(new OrderItemProfile());
            });

            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);

            DataAccessLayer.StartupExtension.DataAccessInitializer(services, configuration);

        }
    }
}
