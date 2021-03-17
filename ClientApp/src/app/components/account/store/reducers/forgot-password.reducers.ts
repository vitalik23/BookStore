import { ForgotPasswordState, initialForgotPasswordState } from '../state/forgot-password.state';
import { ForgotPasswordActionEnum, ForgotPasswordAction } from '../actions/forgot-password.actions';

export const forgotPasswordReducer = (
    state = initialForgotPasswordState,
    action: ForgotPasswordAction
): ForgotPasswordState => {
    switch (action.type){
        case ForgotPasswordActionEnum.ForgotPassword: {
            return {
                ...state,
                forgotModel: action.payload,
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};
