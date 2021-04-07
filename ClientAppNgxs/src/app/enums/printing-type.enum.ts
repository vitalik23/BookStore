export enum PrintingTypeEnum{
    None = 0,
    Book = 1, 
    Journal = 2,
    Newspaper = 3
}

export const PrintingEditionLabel = new Map<number, string>([
    [PrintingTypeEnum.Book, "Book"],
    [PrintingTypeEnum.Journal, "Journal"],
    [PrintingTypeEnum.Newspaper, "Newspaper"],
]);