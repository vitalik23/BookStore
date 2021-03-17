export enum StatusTypeEnum{
    None = 0,
    Paid = 1, 
    Unpaid = 2
}

export const StatusLabel = new Map<number, string>([
    [StatusTypeEnum.Paid, "Paid"],
    [StatusTypeEnum.Unpaid, "Unpaid"]
]);