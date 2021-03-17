import { CreateOrderState } from "./create-order.state";
import { CreatePayState } from "./create-pay.state";
import { GetOrdersClientState } from "./get-orders-client.state";
import { GetOrdersState } from "./get-orders.state";

export interface OrderState {
    getOrdersClientState: GetOrdersClientState;
    createOrderState: CreateOrderState;
    createPayState: CreatePayState;
    getOrdersState: GetOrdersState;
}
