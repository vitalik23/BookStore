import { Login } from '../../models/login.model';
import { Token } from 'src/app/models/token.model';


export interface LoginState {
    loginModel: Login;
    tokenModel: Token;
    rememberMe: boolean;
}

export const initialLoginState: LoginState = {
    loginModel: null,
    tokenModel: null,
    rememberMe: null,
};

