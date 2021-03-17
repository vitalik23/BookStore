import { GetOrdersEnum, GetOrdersActions } from '../actions/get-orders.action';
import { initialGetOrdersState, GetOrdersState } from '../state/get-orders.state';


export const getOrdersReducer = (
    state = initialGetOrdersState,
    action: GetOrdersActions
): GetOrdersState => {
    switch (action.type){
        case GetOrdersEnum.GetOrdersSuccess: {
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
