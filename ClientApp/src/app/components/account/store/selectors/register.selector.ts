import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AccountState } from '../state/account.state';
import { accountReducer } from '../reducers/account.reducers';
import { RegisterModel } from '../../models/register.model';

const selectRegister = createFeatureSelector<AccountState>(accountReducer);

export const selectRegisterModel = createSelector(
    selectRegister,
    (state: AccountState): RegisterModel => state.registerState.registerModel
);

export const selectMessage = createSelector(
    selectRegister,
    (state: AccountState)=> state.registerState?.message
);
