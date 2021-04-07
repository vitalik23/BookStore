import { PageQuery } from "src/app/models/page-query";
import { OrdersFilterModel } from "../../models/order-filter.model";

export class GetOrders{
    static readonly type = '[Order] GetOrders';
    constructor(public payload: PageQuery, public filter: OrdersFilterModel){}
}

