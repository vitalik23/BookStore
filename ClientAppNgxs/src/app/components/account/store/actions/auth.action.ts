import { LoginModel } from "../../models/login.model";
import { TokenModel } from "../../models/token.model";

export class SignIn{
    static readonly type = '[Auth] SignIn';
    constructor(public payload: LoginModel){}
}

export class SignOut{
    static readonly type = '[Auth] SignOut';
}

export class RefreshToken{
    static readonly type = '[Auth] RefreshToken';
    constructor(public payload: TokenModel){}
}

