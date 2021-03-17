using Microsoft.AspNetCore.Builder;
using Store.PresentationLayer.Middlewares;

namespace Store.PresentationLayer.Extensions
{
    public static class ExceptionMiddlewareExtensions
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app)
        {
            app.UseMiddleware(typeof(ExceptionMiddleware));
        }
    }
}
