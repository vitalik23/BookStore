import { createSelector, createFeatureSelector } from '@ngrx/store';
import { printingEditionReducer } from '../reducers/printing-edition.reducer';
import { PrintingEditionState } from '../state/printing-edition.state';

const selectPrintingEdition = createFeatureSelector<PrintingEditionState>(printingEditionReducer);

export const getData = createSelector(
    selectPrintingEdition,
    (state: PrintingEditionState) => state.getPrintingEditions.data
);

export const getPageSize = createSelector(
    selectPrintingEdition,
    (state: PrintingEditionState) => state.getPrintingEditions.pageSize
);

export const getPageNumber = createSelector(
    selectPrintingEdition,
    (state: PrintingEditionState) => state.getPrintingEditions.pageNumber
);

export const getTotalItems = createSelector(
    selectPrintingEdition,
    (state: PrintingEditionState) => state.getPrintingEditions.totalItems
);



