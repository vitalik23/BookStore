import { StatusTypeEnum } from "src/app/enums/status.enum";

export class OrdersFilter{
    sortBy: string;
    typeSort: string;
    status: StatusTypeEnum;
}