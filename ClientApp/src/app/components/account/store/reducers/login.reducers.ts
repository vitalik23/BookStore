import { LoginState, initialLoginState } from '../state/login.state';
import { LoginActions , LoginActionsEnum } from '../actions/login.actions';



export const loginReducers = (
    state = initialLoginState,
    action: LoginActions
): LoginState => {
    switch (action.type) {
        case LoginActionsEnum.LogIn: {
            return {
                ...state,
                loginModel: action.payload
            };
        }
        case LoginActionsEnum.LoginSuccess: {
            return {
                ...state,
                tokenModel: {
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                },
                rememberMe: action.payload.rememberMe,
            };
        }
        case LoginActionsEnum.Logout: {
            return {
                ...state
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};
