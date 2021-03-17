import { CreatePayEnum, CreatePayActions } from '../actions/create-pay.action';
import { initialCreatePayState, CreatePayState } from '../state/create-pay.state';


export const createPayReducer = (
    state = initialCreatePayState,
    action: CreatePayActions
): CreatePayState => {
    switch (action.type){
        case CreatePayEnum.CreatePay: {
            return {
                ...state,
                payModel: action.payload
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};
