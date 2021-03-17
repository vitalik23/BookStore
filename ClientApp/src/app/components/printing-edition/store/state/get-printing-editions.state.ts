import { PrintingEdition } from "src/app/components/printing-edition/models/printing-edition.model";

export interface GetPrintingEditionsState{
    data: PrintingEdition[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
}

export const initialGetPrintingEditionsState: GetPrintingEditionsState = {
    data: null,
    totalItems: null,
    pageNumber: 1,
    pageSize: 6,
    
}