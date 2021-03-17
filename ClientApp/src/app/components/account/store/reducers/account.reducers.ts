import { ActionReducerMap } from '@ngrx/store';
import { AccountState } from '../state/account.state';
import { loginReducers } from './login.reducers';
import { registerReducers } from './register.reducers';
import { confirmEmailReducers } from './confirm-email.reducers';
import { forgotPasswordReducer } from './forgot-password.reducers';
import { refreshReducer } from './refresh-token.reducer';


export const accountReducer = 'accountReducer';

export const accountReducers: ActionReducerMap<AccountState, any> = {
    loginState: loginReducers,
    registerState: registerReducers,
    confirmEmailState: confirmEmailReducers,
    forgotPasswordState: forgotPasswordReducer,
    refreshTokenState: refreshReducer
}
