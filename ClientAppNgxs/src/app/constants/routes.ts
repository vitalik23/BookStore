export class ConstRoutes{
    public static SIGNIN = "account/signin";
    public static SIGNOUT = "account/signout";
    public static SIGNUP = "account/signup";
    public static UPDATE_TOKENS = "account/updatetokens";
    public static CONFIRMEMAIL = "account/confirmemail";
    public static FORGOT_PASSWORD = "account/forgotpassword";
    public static ROUTE_LOGIN = "/account/login";

    public static GET_USERS = "admin/getusers";
    public static GET_PRINTING_EDITIONS = "printingedition/getprintingeditions";
    public static UPDATE_USER_FOR_ADMIN = "admin/updateuseradmin";
    public static UPDATE_PRINTING_EDITION = "printingedition/updateprintingedition";
    public static GET_ALL_AUTHORS = "admin/getallauthors";
    public static CREATE_PRINTING_EDITION = "printingedition/createprintingedition";
    public static CREATE_AUTHOR = "author/createauthor";
    public static GET_AUTHORS = "author/getauthors";
    public static UPDATE_AUTHOR = "author/updateauthor";
    public static GET_USER_ORDERS = "order/getuserorders";
    public static GET_ORDERS = "order/getorders";
    public static CREATE_ORDER = "order/createorder";
    public static BUY_ORDER = "order/buyorder";
    public static GET_MAX_PRICE_PRINTING_EDITION = "printingedition/getmaxpriceprintingedition";
    public static PROFILE = "user/profile";
    public static UPDATE_USER = "user/updateuser";
    public static DELETE_USER = "admin/delete/";
    public static BLOCK_USER = "admin/blockeuser/";
    public static DELETE_PRINTING_EDITION = "printingedition/deleteprintingedition?id=";
    public static GET_PRINTING_EDITION = "printingedition/getprintingedition?id=";
    public static GET_AUTHOR = "author/getauthor/";
    public static DELETE_AUTHOR = "author/deleteauthor/";
    public static LIST_PRINTING_EDITION = "/admin/list-printing-edition";
    public static GET_ROLE = "user/getrole";
}