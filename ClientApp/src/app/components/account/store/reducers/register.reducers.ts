import { initialRegisterSate, RegisterState } from '../state/register.state';
import { RegisterActionsEnum, RegisterActions } from '../actions/register.actions';


export const registerReducers = (
    state = initialRegisterSate,
    action: RegisterActions
): RegisterState => {
    switch (action.type) {
        case RegisterActionsEnum.Register: {
            return {
                ...state,
                registerModel: action.payload
            };
        }
        case RegisterActionsEnum.RegisterSuccess: {
            return {
                ...state,
                message: action.payload
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};
