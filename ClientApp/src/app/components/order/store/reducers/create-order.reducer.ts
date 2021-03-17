import { CreateOrderEnum, CreateOrderAction } from '../actions/create-order.action';
import { initialCreateOrderState, CreateOrderState } from '../state/create-order.state';


export const createOrderReducer = (
    state = initialCreateOrderState,
    action: CreateOrderAction
): CreateOrderState => {
    switch (action.type){
        case CreateOrderEnum.CreateOrder: {
            return {
                ...state,
                orderItems: action.payload
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};
