import { PrintingTypeEnum } from "src/app/enums/printing-type";
import { CurrencyTypeEnum } from "../../../enums/currency-type";


export class PrintingEditionFilterModel{
    sortBy: string;
    printingEditionName: string;
    category: PrintingTypeEnum[];
    authorName: string;
    price: number;
    typeSort: string;
    minPrice: number;
    maxPrice: number;
    currency: CurrencyTypeEnum
}