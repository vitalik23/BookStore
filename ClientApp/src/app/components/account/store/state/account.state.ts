import { ConfirmEmailState } from './confirm-email.state';
import { ForgotPasswordState } from './forgot-password.state';
import { LoginState } from './login.state';
import { RefreshTokenState } from './refresh-token.state';
import { RegisterState } from './register.state';


export interface AccountState {
    loginState: LoginState;
    registerState: RegisterState;
    confirmEmailState: ConfirmEmailState;
    forgotPasswordState: ForgotPasswordState;
    refreshTokenState: RefreshTokenState;
}
