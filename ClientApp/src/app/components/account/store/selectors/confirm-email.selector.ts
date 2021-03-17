import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AccountState } from '../state/account.state';
import { accountReducer } from '../reducers/account.reducers';
import { ConfirmEmailModel } from '../../models/confirm-email.model';

const selectConfirmEmail = createFeatureSelector<AccountState>(accountReducer);

export const selectModel = createSelector(
    selectConfirmEmail,
    (state: AccountState): ConfirmEmailModel => state.confirmEmailState.confirmModel
);
