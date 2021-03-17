import { CurrencyTypeEnum } from "src/app/enums/currency-type";
import { PrintingTypeEnum } from "src/app/enums/printing-type";

export class PrintingEditionSuccessModel{
    id: number;
    title: string;
    description: string;
    price: number;
    currency: CurrencyTypeEnum;
    type: PrintingTypeEnum;
    authorsId: number[];
    authorInPrintingEdition: [];
}