using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Store.DataAccessLayer.Entities;
using Store.Shared.Constants;
using Store.Shared.Options;
using System;
using System.Text;


namespace AjaxWebApplication
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            Store.BusinessLogicLayer.StartupExtension.BusinessLogicInitializer(services, Configuration);

            services.Configure<StripeConnectionOptions>(Configuration);
            services.Configure<EmailConnectionOptions>(Configuration.GetSection("emailConfig"));
            services.Configure<ClientConnectionOptions>(Configuration.GetSection("clientConfig"));
            services.Configure<JwtConnectionOptions>(Configuration.GetSection("jwtConfig"));
            services.Configure<ConvertConnectionOptions>(Configuration.GetSection("convertConfig"));
            services.Configure<StringConnectionOptions>(Configuration.GetSection("ConnectionStrings"));

            services.AddIdentityCore<User>()
                .AddDefaultTokenProviders();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddCookie(IdentityConstants.ApplicationScheme)
                .AddCookie(IdentityConstants.ExternalScheme)
                .AddCookie(IdentityConstants.TwoFactorUserIdScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ClockSkew = TimeSpan.FromMinutes(Constants.Numbers.START_VALUE),
                        ValidateIssuer = true,
                        ValidIssuer = Configuration["jwtConfig:Issuer"],
                        ValidateAudience = true,
                        ValidAudience = Configuration["jwtConfig:Audience"],
                        ValidateLifetime = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration["jwtConfig:SecretKey"])),
                        ValidateIssuerSigningKey = true,
                    };
                });

            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

            services.AddControllersWithViews();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
