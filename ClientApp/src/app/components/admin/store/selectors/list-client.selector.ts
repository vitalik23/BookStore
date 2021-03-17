import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserProfile } from '../../../user/models/user-profile.model';
import { adminReducer } from '../reducers/admin.reducer';
import { AdminState } from '../state/admin.state';

const selectClient = createFeatureSelector<AdminState>(adminReducer);

export const getData = createSelector(
    selectClient,
    (state: AdminState): UserProfile[] => state.listClientState?.data
);

export const getPageSize = createSelector(
    selectClient,
    (state: AdminState) => state.listClientState?.pageSize
);

export const getPageNumber = createSelector(
    selectClient,
    (state: AdminState) => state.listClientState?.pageNumber
);

export const getTotalItems = createSelector(
    selectClient,
    (state: AdminState) => state.listClientState?.totalItems
);


