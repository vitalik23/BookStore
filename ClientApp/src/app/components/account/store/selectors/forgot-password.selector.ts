import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AccountState } from '../state/account.state';
import { accountReducer } from '../reducers/account.reducers';
import { ForgotPasswordModel } from '../../models/forgot-password.model';

const selectForgotPassword = createFeatureSelector<AccountState>(accountReducer);

export const selectModel = createSelector(
    selectForgotPassword,
    (state: AccountState): ForgotPasswordModel => state.forgotPasswordState.forgotModel
);

export const selectMessage = createSelector(
    selectForgotPassword,
    (state: AccountState) => state.forgotPasswordState?.message
)

