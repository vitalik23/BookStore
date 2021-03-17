import { ConfirmEmailState, initialConfirtEmailState } from '../state/confirm-email.state';
import { ConfirmEmailAction, ConfirmEmailActionEnum} from '../actions/confirm-email.actions';

export const confirmEmailReducers = (
    state = initialConfirtEmailState,
    action: ConfirmEmailAction
): ConfirmEmailState => {
    switch (action.type) {
        case ConfirmEmailActionEnum.ConfirmEmail: {
            return {
                ...state,
                confirmModel: action.payload
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};
