import { ForgotPasswordModel } from '../../models/forgot-password.model';

export interface ForgotPasswordState{
    forgotModel: ForgotPasswordModel;
    message: string;
}

export const initialForgotPasswordState: ForgotPasswordState  = {
    forgotModel: null,
    message: null

};
