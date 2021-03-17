import { ActionReducerMap } from "@ngrx/store";
import { PrintingEditionState } from "../state/printing-edition.state";
import { getMaxPricePrintingEditionReducer } from "./get-maxprice-printing-edition.reducer";
import { getPrintingEditionReducer } from "./get-printing-edition.reducer";
import { getPrintingEditionsReducer } from "./get-printing-editions.reducer";


export const printingEditionReducer = 'printingEditionReducer';

export const printingEditionReducers: ActionReducerMap<PrintingEditionState> = {
    getMaxPricePrintingEditionState: getMaxPricePrintingEditionReducer,
    getPrintingEdition: getPrintingEditionReducer,
    getPrintingEditions: getPrintingEditionsReducer
    
};
