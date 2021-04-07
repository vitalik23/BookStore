import { StatusTypeEnum } from "src/app/enums/status-type.enum";

export class OrdersFilterModel{
    sortBy: string;
    typeSort: string;
    status: StatusTypeEnum;
}