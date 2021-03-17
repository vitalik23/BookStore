using Store.Shared.Constants;
using System.ComponentModel.DataAnnotations;


namespace Store.BusinessLogicLayer.Models.Authentication
{
    public class LoginModel
    {
        public string Email { get; set; }

        public string Password { get; set; }
    }
}
