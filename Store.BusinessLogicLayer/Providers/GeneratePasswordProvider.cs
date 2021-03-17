using Store.Shared.Constants;
using System;
using System.Text;

namespace Store.BusinessLogicLayer.Providers
{
    public class GeneratePasswordProvider
    {
        public string GeneratePassword()
        {
            string valid = Constants.Password.VALID;
            var result = new StringBuilder();
            var random = new Random();
            for (int i = default; i < Constants.Password.LENGTH_PASSWORD; i++)
            {
                char value = valid[random.Next(valid.Length)];
                result.Append(value);
            }

            string newPassword = result.ToString();

            return newPassword;
        }
    }
}
