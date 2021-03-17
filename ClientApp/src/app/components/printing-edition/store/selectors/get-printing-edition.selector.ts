import { createSelector, createFeatureSelector } from '@ngrx/store';
import { printingEditionReducer } from '../reducers/printing-edition.reducer';
import { PrintingEditionState } from '../state/printing-edition.state';


const selectPrintingEdition = createFeatureSelector<PrintingEditionState>(printingEditionReducer);

export const getPrintingEdition = createSelector(
    selectPrintingEdition,
    (state: PrintingEditionState) => state.getPrintingEdition.printingEdition
);

export const getAuthorsId = createSelector(
    selectPrintingEdition,
    (state: PrintingEditionState) => state.getPrintingEdition.authorsId
);
