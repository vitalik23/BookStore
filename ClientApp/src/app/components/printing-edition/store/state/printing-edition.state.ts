import { GetMaxPricePrintingEditionState } from "./get-maxprice-printing-edition.state";
import { GetPrintingEditionState } from "./get-printing-edition.state";
import { GetPrintingEditionsState } from "./get-printing-editions.state";


export interface PrintingEditionState {
    getMaxPricePrintingEditionState: GetMaxPricePrintingEditionState;
    getPrintingEditions: GetPrintingEditionsState;
    getPrintingEdition: GetPrintingEditionState;

}
