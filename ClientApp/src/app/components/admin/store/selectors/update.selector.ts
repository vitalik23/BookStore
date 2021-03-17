import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserProfile } from 'src/app/components/user/models/user-profile.model';
import { adminReducer } from '../reducers/admin.reducer';
import { AdminState } from '../state/admin.state';

const selectUpdate = createFeatureSelector<AdminState>(adminReducer);

export const selectUpdateModel = createSelector(
    selectUpdate,
    (state: AdminState): UserProfile => state.updateState.updateUserModel
);

