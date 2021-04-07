import { CurrencyTypeEnum } from "src/app/enums/currency-type.enum";
import { PrintingTypeEnum } from "src/app/enums/printing-type.enum";

export class PrintingEditionModel{
    id: number;
    title: string;
    description: string;
    price: number;
    currency: CurrencyTypeEnum;
    type: PrintingTypeEnum;
    authorsId: number[];
    authorInPrintingEdition: any;
}