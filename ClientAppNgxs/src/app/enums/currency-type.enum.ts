export enum CurrencyTypeEnum{
    None = 0,
    USD = 1, 
    EUR = 2,
    GBP = 3,
    CHF = 4,
    JPY = 5,
    UAH = 6
}

export const CurrencyLabel = new Map<number, string>([
    [CurrencyTypeEnum.USD, "$"],
    [CurrencyTypeEnum.EUR, "€"],
    [CurrencyTypeEnum.GBP, "£"],
    [CurrencyTypeEnum.CHF, "₣"],
    [CurrencyTypeEnum.JPY, "¥"],
    [CurrencyTypeEnum.UAH, "₴"],
]);