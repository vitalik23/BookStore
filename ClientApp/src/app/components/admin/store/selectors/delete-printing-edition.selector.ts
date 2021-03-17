import { createSelector, createFeatureSelector } from '@ngrx/store';
import { adminReducer } from '../reducers/admin.reducer';
import { AdminState } from '../state/admin.state';

const selectDeletePrintingEdition = createFeatureSelector<AdminState>(adminReducer);

export const getIdPrintingEdition = createSelector(
    selectDeletePrintingEdition,
    (state: AdminState) => state.deletePrintingEditionState.id
);
