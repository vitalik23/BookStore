

using Microsoft.AspNetCore.Http;
using Store.Shared.Constants;
using System.Threading.Tasks;

namespace Store.PresentationLayer.Middlewares
{
    public class TokenMiddleware
    {
        private RequestDelegate _next;

        public TokenMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            string access_token = context.Request.Cookies[Constants.Token.ACCESS_TOKEN_NAME];
            if (!string.IsNullOrWhiteSpace(access_token))
            {
                context.Request.Headers.Add(Constants.Token.AUTHORIZATION, $"{Constants.Token.BEARER} {access_token}");
            }

            await _next.Invoke(context);
        }
    }
}
