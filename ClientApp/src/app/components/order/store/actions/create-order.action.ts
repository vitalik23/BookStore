import { Action } from "@ngrx/store";
import { OrderItemModel } from "../../models/order-item.model";

export enum CreateOrderEnum{
    CreateOrder = "[CreateOrder] CreateOrder",
    CreateOrderSuccess = "[CreateOrder] CreateOrderSuccess"
}

export class CreateOrder implements Action{
    public readonly type = CreateOrderEnum.CreateOrder;
    constructor(public payload: OrderItemModel[]){}
}

export class CreateOrderSuccess implements Action{
    public readonly type = CreateOrderEnum.CreateOrderSuccess;
    constructor(public payload: OrderItemModel[]){}
}

export type CreateOrderAction = CreateOrder | CreateOrderSuccess;