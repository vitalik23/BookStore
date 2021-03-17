import { EBaseError, BaseErrorActions } from '../actions/base-error.action';
import { initialErrorState, BaseErrorState } from '../state/base-error.state';

export const errorReducer = (
    state = initialErrorState,
    action: BaseErrorActions
): BaseErrorState => {
    switch (action.type){
        case EBaseError.GetError: {
            return {
                ...state,
                errorMessage: action.payload
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};

