import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AccountState } from '../state/account.state';
import { Login } from '../../models/login.model';
import { accountReducer } from '../reducers/account.reducers';

export const selectLogin = createFeatureSelector<AccountState>(accountReducer);

export const selectModel = createSelector(
    selectLogin,
    (state: AccountState): Login => state.loginState.loginModel
);


export const getAccessToken = createSelector(
    selectLogin,
    (state: AccountState) => state.loginState.tokenModel.accessToken
);


