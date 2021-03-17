using Dapper.Contrib.Extensions;
using Microsoft.AspNetCore.Identity;

namespace Store.DataAccessLayer.Entities
{
    [Table("AspNetUsers")]
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string RefreshToken { get; set; }
        public bool IsBlocked { get; set; }
    }
}
