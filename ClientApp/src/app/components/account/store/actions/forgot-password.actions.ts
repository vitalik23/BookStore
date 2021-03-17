import { Action } from '@ngrx/store';
import { ForgotPasswordModel } from '../../models/forgot-password.model';

export enum ForgotPasswordActionEnum{
    ForgotPassword = '[ForgotPassword] ForgotPassword',
    ForgotPasswordSuccess = '[ForgotPassword] ForgotPasswordSuccess',
}

export class ForgotPassword implements Action{
    public type = ForgotPasswordActionEnum.ForgotPassword;
    constructor(public payload: ForgotPasswordModel){}
}

export class ForgotPasswordSuccess implements Action{
    public type = ForgotPasswordActionEnum.ForgotPasswordSuccess;
    constructor(public payload: ForgotPasswordModel){}
}


export type ForgotPasswordAction = ForgotPassword | ForgotPasswordSuccess;
