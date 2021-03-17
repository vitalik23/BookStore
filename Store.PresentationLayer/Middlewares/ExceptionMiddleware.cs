using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Store.Shared.Common.Exceptions;
using Store.Shared.Constants;
using Store.Shared.Enums;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;


namespace Store.PresentationLayer.Middlewares
{
    public class ExceptionMiddleware
    {
        private RequestDelegate _next;
        private ILogger _logger;

        public ExceptionMiddleware(RequestDelegate next, ILoggerFactory loggerFactory)
        {
            _next = next;
            _logger = loggerFactory.CreateLogger<ExceptionMiddleware>();
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                
                await _next.Invoke(context);

                string body = await new StreamReader(context.Request.Body, Encoding.UTF8).ReadToEndAsync();
                string url = context.Request.GetDisplayUrl();

                _logger.Log(LogLevel.Information, Constants.Numbers.START_VALUE, $"{Constants.Logger.REQUEST_METHOD} {context.Request.Method}, {Constants.Logger.REQUEST_BODY} {body}, {Constants.Logger.REQUEST_URL} {url}", null);

            }
            catch (ServerException ex)
            {
                await HandleExceptionAsync(context, ex);
            }
            catch (Exception ex)
            {
                _logger.LogError($"{Constants.Logger.EXCEPTION} {ex.Message}");
                _logger.LogError($"{Constants.Logger.STACK_TRACE} {ex.StackTrace}");

                context.Response.ContentType = Constants.Attribute.PRODUCES;
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                await context.Response.WriteAsync(Constants.Errors.SERVER_EXEPTION);
            }

        }

        private static async Task HandleExceptionAsync(HttpContext context, ServerException exception)
        {
            string result = JsonConvert.SerializeObject(new List<string>(exception.ErrorMessages));
            context.Response.ContentType = Constants.Attribute.PRODUCES;
            context.Response.StatusCode = (int)exception.Code;
            await context.Response.WriteAsync(result);
        }

    }
}
