import { CurrencyTypeEnum } from "src/app/enums/currency-type.enum";
import { PrintingTypeEnum } from "src/app/enums/printing-type.enum";



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