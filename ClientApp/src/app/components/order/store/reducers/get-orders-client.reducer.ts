import { GetOrdersClientEnum, GetOrdersClientActions } from '../actions/get-orders-client.action';
import { initialGetOrdersClientState, GetOrdersClientState } from '../state/get-orders-client.state';


export const getOrdersClientReducer = (
    state = initialGetOrdersClientState,
    action: GetOrdersClientActions
): GetOrdersClientState => {
    switch (action.type){
        case GetOrdersClientEnum.GetOrdersClientSuccess: {
            return {
                ...state,
                data: action.payload.data,
                pageNumber: action.payload.pageNumber,
                pageSize: action.payload.pageSize,
                totalItems: action.payload.totalItems
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};
