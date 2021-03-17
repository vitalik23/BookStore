import { PrintingEdition } from "src/app/components/printing-edition/models/printing-edition.model";

export interface GetPrintingEditionState{
    id: number;
    printingEdition: PrintingEdition;
    authorsId: number[];
}

export const initialGetPrintingEditionState: GetPrintingEditionState = {
    id: null,
    printingEdition: null,
    authorsId: null
    
}