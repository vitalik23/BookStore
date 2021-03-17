import { createSelector, createFeatureSelector } from '@ngrx/store';
import { printingEditionReducer } from '../reducers/printing-edition.reducer';
import { PrintingEditionState } from '../state/printing-edition.state';


const selectMaxPricePrintingEdition = createFeatureSelector<PrintingEditionState>(printingEditionReducer);

export const getMaxPricePrintingEdition = createSelector(
    selectMaxPricePrintingEdition,
    (state: PrintingEditionState) => state.getMaxPricePrintingEditionState?.maxPrice
);


