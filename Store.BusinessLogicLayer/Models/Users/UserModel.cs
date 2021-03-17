﻿
namespace Store.BusinessLogicLayer.Models.Users
{
    public class UserModel
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string PasswordConfirm { get; set; }
        public bool IsBlocked { get; set; }
        public string CurrentPassword { get; set; }
    }
}
