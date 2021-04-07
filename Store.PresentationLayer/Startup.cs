using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Store.DataAccessLayer.Entities;
using Store.PresentationLayer.Extensions;
using Store.PresentationLayer.Middlewares;
using Store.Shared.Common.Logger;
using Store.Shared.Constants;
using Store.Shared.Options;
using System;
using System.IO;
using System.Reflection;
using System.Text;

namespace Store.PresentationLayer
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

            BusinessLogicLayer.StartupExtension.BusinessLogicInitializer(services, Configuration);

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


            services.AddCors();

            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc(Constants.Swagger.VERSION,
                    new OpenApiInfo
                    {
                        Title = Constants.Swagger.TITLE,
                        Description = Constants.Swagger.DESCRIPTION_SWAGGER_DOC,
                        Version = Constants.Swagger.VERSION
                    });

                options.AddSecurityDefinition(Constants.Token.BEARER, new OpenApiSecurityScheme
                {
                    Description = Constants.Swagger.DESCRIPTION_ADD_SECURITY_DEFINITION,
                    Name = Constants.Swagger.NAME_AUTHORIZATION,
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = Constants.Token.BEARER
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = Constants.Token.BEARER
                            }
                        },
                        new string[] { }
                    }
                });

                var fileName = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var filePath = Path.Combine(AppContext.BaseDirectory, fileName);
                options.IncludeXmlComments(filePath);
            });

            services.AddRazorPages();

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            app.ConfigureExceptionHandler();

            loggerFactory.AddFile(Path.Combine(Directory.GetCurrentDirectory(), Constants.Logger.LOGGER_TXT));
            var logger = loggerFactory.CreateLogger(Constants.Logger.FILE_LOGGER);

            app.UseMiddleware<TokenMiddleware>();

            app.UseDefaultFiles();

            app.UseRouting();
            app.UseStaticFiles();

            app.UseCors(builder => 
            {
                builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {

                endpoints.MapRazorPages();

                endpoints.MapControllers();
            });

            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint(Constants.Swagger.SWAGGER_ENDPOINT, Constants.Swagger.TITLE);

            });



        }
    }
}
