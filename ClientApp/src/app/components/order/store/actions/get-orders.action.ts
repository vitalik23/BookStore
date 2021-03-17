import { Action } from "@ngrx/store";
import { PageQuery } from "src/app/models/page/page-query.model";
import { PageResponse } from "src/app/models/page/page-response.model";
import { OrdersFilter } from "../../models/filter-orders.model";

export enum GetOrdersEnum{
    GetOrders = "[GetOrders] GetOrders",
    GetOrdersSuccess = "[GetOrders] GetOrdersSuccess"
}

export class GetOrders implements Action{
    public readonly type = GetOrdersEnum.GetOrders;
    constructor(public payload: PageQuery, public filter: OrdersFilter){}
}

export class GetOrdersSuccess implements Action{
    public readonly type = GetOrdersEnum.GetOrdersSuccess;
    public constructor(public payload: PageResponse) {}
}

export type GetOrdersActions = GetOrdersSuccess | GetOrders;