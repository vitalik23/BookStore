using Microsoft.Extensions.Logging;
using System;
using System.IO;

namespace Store.Shared.Common.Logger
{
    public class FileLogger : ILogger
    {
        private string _filePath;
        private static object _lock = new object();

        public FileLogger(string filePath)
        {
            _filePath = filePath;
        }

        public IDisposable BeginScope<TState>(TState state)
        {
            return null;
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            return true;
        }

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            if (formatter is not null)
            {
                lock (_lock)
                {
                    File.AppendAllText(_filePath, $"{DateTime.Now} {formatter(state, exception)} {Environment.NewLine}");
                }
            }
        }
    }
}