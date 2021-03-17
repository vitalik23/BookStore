import { ActionReducerMap } from "@ngrx/store";
import { OrderState } from "../state/order.state";
import { createOrderReducer } from "./create-order.reducer";
import { createPayReducer } from "./create-pay.reducer";
import { getOrdersClientReducer } from "./get-orders-client.reducer";
import { getOrdersReducer } from "./get-orders.reducer";

export const orderReducer = 'orderReducer';

export const orderReducers: ActionReducerMap<OrderState> = {
    getOrdersClientState: getOrdersClientReducer,
    createOrderState: createOrderReducer,
    createPayState: createPayReducer,
    getOrdersState: getOrdersReducer,
    
};
