import { OrderItemModel } from "../../models/order-item.model";

export interface CreateOrderState{
    orderItems: OrderItemModel[];
}

export const initialCreateOrderState: CreateOrderState = {
    orderItems: null
}