import { PrintingEdition } from "src/app/components/printing-edition/models/printing-edition.model";

export interface AddPrintingEditionState{
    printingEdition: PrintingEdition;
}

export const initialAddPrintingEdition: AddPrintingEditionState = {
    printingEdition: null
}