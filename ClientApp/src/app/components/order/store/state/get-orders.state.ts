import { OrderItemModel } from "../../models/order-item.model";

export interface GetOrdersState{
    data: OrderItemModel[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
}

export const initialGetOrdersState: GetOrdersState = {
    data: null,
    pageNumber: 1,
    pageSize: 5,
    totalItems: null,
}