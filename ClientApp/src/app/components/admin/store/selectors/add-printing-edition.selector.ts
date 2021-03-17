import { createSelector, createFeatureSelector } from '@ngrx/store';
import { adminReducer } from '../reducers/admin.reducer';
import { AdminState } from '../state/admin.state';

const selectAddPrintingEdition = createFeatureSelector<AdminState>(adminReducer);

export const selectPrintingEdition = createSelector(
    selectAddPrintingEdition,
    (state: AdminState) => state.addPrintingEditionState.printingEdition
);
