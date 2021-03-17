using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using Store.Shared.Options;
using System.Net;
using static Store.Shared.Enums.Enums;

namespace Store.BusinessLogicLayer.Providers
{
    public class ConvertCurrencyProvider
    {
        private readonly IOptions<ConvertConnectionOptions> _connectionOptions;
        private readonly string _exchangeValue;
        private readonly string _rateValue;

        public ConvertCurrencyProvider(IOptions<ConvertConnectionOptions> connectionOptions)
        {
            _connectionOptions = connectionOptions;
            _exchangeValue = _connectionOptions.Value.Exchange;
            _rateValue = _connectionOptions.Value.Rate;
        }

        public decimal Convert(decimal amount, CurrencyType convertFrom, CurrencyType? convertTo)
        {

            string url = string.Format(_exchangeValue, convertFrom, convertTo);

            var client = new WebClient();

            string json = client.DownloadString(url);

            JToken token = JObject.Parse(json);

            decimal exchangeRate = (decimal)token.SelectToken(_rateValue);

            decimal convertedNumber = amount * exchangeRate;

            return convertedNumber;
        }
    }
}
