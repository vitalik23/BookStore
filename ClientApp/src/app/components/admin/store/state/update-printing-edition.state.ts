import { PrintingEdition } from 'src/app/components/printing-edition/models/printing-edition.model';

export interface UpdatePrintingEditionState{
    printingEdition: PrintingEdition;
}

export const initialUpdatePrintingEditionState: UpdatePrintingEditionState = {
    printingEdition: null
};
