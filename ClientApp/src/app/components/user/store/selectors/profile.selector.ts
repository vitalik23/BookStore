import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserProfile } from '../../models/user-profile.model';
import { userReducer } from '../reducers/user.reducer';
import { UserState } from '../state/user.state';

const selectProfile = createFeatureSelector<UserState>(userReducer);

export const selectProfileModel = createSelector(
    selectProfile,
    (state: UserState): UserProfile => state.profileState?.profileModel
);

export const getIsBlocked = createSelector(
    selectProfile,
    (state: UserState) => state.profileState.profileModel?.isBlocked
);
