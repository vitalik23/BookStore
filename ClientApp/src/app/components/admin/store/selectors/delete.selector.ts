import { createSelector, createFeatureSelector } from '@ngrx/store';
import { adminReducer } from '../reducers/admin.reducer';
import { AdminState } from '../state/admin.state';

const selectDelete = createFeatureSelector<AdminState>(adminReducer);

export const selectDeleteId = createSelector(
    selectDelete,
    (state: AdminState) => state.deleteState.id
);
