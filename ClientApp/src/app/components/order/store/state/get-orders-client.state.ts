import { OrderItemModel } from "../../models/order-item.model";

export interface GetOrdersClientState{
    data: OrderItemModel[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
}

export const initialGetOrdersClientState: GetOrdersClientState = {
    data: null,
    pageNumber: 1,
    pageSize: 5,
    totalItems: null,
}