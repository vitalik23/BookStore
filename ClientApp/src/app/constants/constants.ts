export class Constants{
    public static TIMEOUT = 500;
    public static LENGTH_CATEGORY_ARRAY = 1;
    public static START_VALUE = 0;
    public static QUANTITY = 1;
    public static MIN_PRICE = 0;
    public static MAX_PRICE = 5000;
    public static ID_START_VALUE = 0;
    public static INDEX_ELEMENT = -1;
    public static COUNT_ELEMENT_DELETE = 1;
    public static COUNT_ELEMENT_AFTER_COMMA = 2;
    public static COUNT_ELEMENT_IN_ARRAY = 1;
    public static START_PAGE_NUMBER = 1;

    public static CODE_ERROR_CONNECTION = 0;
    public static CODE_ERROR_FORBIDDEN_EROR = 403;
    public static CODE_ERROR_BAD_REQUEST = 400;
    public static CODE_ERROR_UNAUTHORIZE = 401;

    public static ADMIN = "Admin";
    public static BEARER = "Bearer ";
    public static ACCESS_TOKEN = 'accessToken';
    public static REFRESH_TOKEN = 'refreshToken';
    public static SUCCESSFULLY_ADDED_TO_CART = "successfully added to cart";
    public static QUANTITY_ISNT_LESS_THAN_ZERO = "Quantity isn't less than zero";
    public static PLEASE_LOGIN_TO_YOUR_ACCOUNT = "Please log in to your account";
    public static YOU_DONT_HAVE_ACCESS = "You don't have access";
    public static EMPTY_ORDER = "Сannot create an empty order!";
    public static ID = "id";
    public static GET_ROLE = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
    public static UNDEFINED = 'undefined';
    public static INTERNAL_SERVER_ERROR = "Internal server error! Please, try later!";
    public static SUCCESSFULY_COMPLITED_ORDER = "You have successfully completed your order";
    public static CART = 'cart';

    public static SORT_BY_ID = "Id";
    public static SORT_BY_PRICE = "Price";
    public static SORT_BY_NAME = "Name";
    public static SORT_BY_CREATE_DATE = "CreateDate";
    public static SORT_ASC = "Asc";
    public static SORT_DESC = "Desc";

    public static CATEGORY_BOOK = "book";
    public static CATEGORY_JOURNAL = "journal";
    public static CATEGORY_NEWSPAPER = "newspaper";

    public static FORM_FIELD_PASSWORD = 'password';
    public static FORM_FIELD_PASSWORD_CONFIRM = 'passwordConfirm';
    public static FORM_FIELD_AUTHORS = 'authors';
    public static FORM_FIELD_DESCRIPTIONS = 'description';
    public static FORM_FIELD_PRICE = 'price';
    public static FORM_FIELD_TYPE = 'type';
    public static FORM_FIELD_TITLE = 'title';
    public static FORM_FIELD_USER_IS_BLOCKED_TRUE = 'userIsBlockedTrue';
    public static FORM_FIELD_USER_IS_BLOCKED_FALSE = 'userIsBlockedFalse';
    public static FORM_FIRST_NAME = 'firstName';
    public static FORM_LAST_NAME = 'lastName';
    public static FORM_EMAIL = 'email';
    public static FORM_NAME = 'name';
    public static FORM_PAID = 'paid';
    public static FORM_UNPAID = 'unpaid';
    public static FORM_CARDNUMBER = 'cardnumber';
    public static FORM_CVC = 'cvc';
    public static FORM_MONTH = 'month';
    public static FORM_YEAR = 'year'; 
    public static FORM_MINPRICE = 'minPrice';
    public static FORM_MAXPRICE = 'maxPrice';

    public static STYLE_WIDTH = '350px';
    public static STYLE_WIDTH_WINDOW = '550px';

    public static ROUTE_GET_ORDERS = "/order/get-orders";
    public static ROUTE_GET_PRINTING_EDITIONS = "/admin/list-printing-edition";
    public static ROUTE_GET_CLIENTS = "/admin/list-client";
    public static ROUTE_GET_CLIENT_ORDERS = "/order/client-orders";
    public static ROUTE_PROFILE = "/user/profile";
    public static ROUTE_GET_AUTHORS = "/author/get-authors";
    public static ROUTE_MAIN_PAGE = "/";
    public static ROUTE_LOGIN = "/account/login";
    public static ROUTE_REGISTER = "/account/register";
    public static ROUTE_FORGOT_PASSWORD = "/account/forgot-password";

    public static SIGNIN = "account/signin";
    public static SIGNUP = "account/signup";
    public static CONFIRMEMAIL = "account/confirmemail";
    public static FORGOT_PASSWORD = "account/forgotpassword";
    public static UPDATE_TOKENS = "account/updatetokens";
    public static SIGNOUT = "account/signout";

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


}