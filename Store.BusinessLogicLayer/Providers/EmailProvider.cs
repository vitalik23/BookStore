using Microsoft.Extensions.Options;
using Store.Shared.Common.Exceptions;
using Store.Shared.Options;
using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Store.BusinessLogicLayer.Providers
{
    public class EmailProvider 
    {
        private readonly IOptions<EmailConnectionOptions> _connectionOptions;
        private string _mailAddress;
        private string _port;
        private string _password;

        public EmailProvider(IOptions<EmailConnectionOptions> connectionOptions )
        {
            _connectionOptions = connectionOptions;
            _mailAddress = _connectionOptions.Value.MailAddress;
            _port = _connectionOptions.Value.Port;
            _password = _connectionOptions.Value.Password;
        }

        
        public async Task SendEmailAsync(string mailTo, string caption, string textMessage )
        {
            try
            {
                var mail = new MailMessage();
                mail.From = new MailAddress(_mailAddress);
                mail.To.Add(new MailAddress(mailTo));
                mail.Subject = caption;
                mail.Body = textMessage;

                var client = new SmtpClient();
               
                client.Host = Shared.Constants.Constants.Email.SMTP_CLIENT;
                client.Port = Convert.ToInt32(_port);
                client.EnableSsl = true;
                client.Credentials = new NetworkCredential(_mailAddress, _password);
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                await client.SendMailAsync(mail);
                mail.Dispose();
                
            }
            catch
            {
                throw new ServerException(Shared.Constants.Constants.Errors.SMS_TO_EMAIL_NOT_DELIVERED);
            }
        }
    }
}
