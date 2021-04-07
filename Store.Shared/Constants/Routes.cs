

namespace Store.Shared.Constants
{
    public partial class Constants
    {
        public class Routes
        {
            
            public const string ACCOUNT = "account";
            public const string SIGN_IN = "signin";
            public const string SIGN_UP = "signup";
            public const string SIGN_OUT = "signout";
            public const string FORGOT_PASSWORD = "forgotpassword";
            public const string CONFIRM_EMAIL = "confirmemail";
            public const string UPDATE_TOKENS = "updatetokens";
            public const string GET_ROLE = "getrole";


            public const string ADMIN = "admin";
            public const string DELETE_USER = "delete";
            public const string GET_USERS = "getusers";
            public const string UPDATE_USER_ADMIN = "updateuseradmin";
            public const string BLOCKE_USER = "blockeuser";
            public const string GET_USER_CLIENT = "getuserclients";
            public const string GET_ALL_AUTHORS = "getallauthors";

           
            public const string USER = "user";
            public const string PROFILE = "profile";
            public const string UPDATE_USER = "updateuser";

            
            public const string PRINTING_EDITION = "printingedition";
            public const string CREATE_PRINTING_EDITION = "createprintingedition";
            public const string GET_PRINTING_EDITIONS = "getprintingeditions";
            public const string UPDATE_PRINTING_EDITION = "updateprintingedition";
            public const string DELETE_PRINTING_EDITION = "deleteprintingedition";
            public const string GET_PRINTING_EDITION = "getprintingedition";
            public const string GET_MAX_PRICE_PRINTING_EDITION = "getmaxpriceprintingedition";


            
            public const string AUTHOR = "author";
            public const string CREATE_AUTHOR = "createauthor";
            public const string GET_AUTHORS = "getauthors";
            public const string GET_AUTHOR = "getauthor";
            public const string GET_AUTHORS_BY_IDS = "getauthorsbyids";
            public const string UPDATE_AUTHOR = "updateauthor";
            public const string DELETE_AUTHOR = "deleteauthor";

           
            public const string ORDER = "order";
            public const string GET_ORDERS = "getorders";
            public const string BUY_ORDER = "buyorder";
            public const string CREATE_ORDER = "createorder";
            public const string GET_USER_ORDERS = "getuserorders";


            public const string ID = "/{id}";
        }

        public static class Posts
        {
            public const string Get = "get/{id}";
        }
    }
}
