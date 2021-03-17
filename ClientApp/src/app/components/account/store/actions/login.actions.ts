import { Action } from '@ngrx/store';
import { LoginSuccessModel } from '../../models/login-success.model';
import { Login } from '../../models/login.model';


export enum LoginActionsEnum {
    LogIn = '[Login] Login',
    LoginSuccess = '[Login] LoginSuccess',
    Logout = "[Logout] Logout"
}

export class LogIn implements Action{
    public readonly type = LoginActionsEnum.LogIn;
    constructor(public payload: Login) {}
}

export class LoginSuccess implements Action {
    public readonly type = LoginActionsEnum.LoginSuccess;
    constructor( public payload: LoginSuccessModel) {}
}

export class Logout implements Action {
    readonly type = LoginActionsEnum.Logout;
}

export type LoginActions = LogIn | LoginSuccess | Logout;
