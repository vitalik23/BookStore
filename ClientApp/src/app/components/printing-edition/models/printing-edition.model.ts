import { CurrencyTypeEnum } from "../../../enums/currency-type";
import { PrintingTypeEnum } from "../../../enums/printing-type";

export class PrintingEdition{
    id: number;
    title: string;
    description: string;
    price: number;
    currency: CurrencyTypeEnum;
    type: PrintingTypeEnum;
    authorsId: number[];
    authorInPrintingEdition: any;
}