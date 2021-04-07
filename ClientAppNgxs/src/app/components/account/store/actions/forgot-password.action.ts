import { ForgotPasswordModel } from "../../models/forgot-password.model";

export class ForgotPassword{
    static readonly type = '[ForgotPassword] ForgotPassword';
    constructor(public payload: ForgotPasswordModel){}
}