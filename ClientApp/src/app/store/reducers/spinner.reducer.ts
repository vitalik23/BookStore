import { EnumSpinner, SpinnerActions } from '../actions/spinner.action';
import { initialSpinnerState, SpinnerState } from '../state/spinner.state';

export const spinnerReducer = (
    state = initialSpinnerState,
    action: SpinnerActions
): SpinnerState => {
    switch (action.type){
        case EnumSpinner.SpinnerShow: {
            return {
                ...state,
                isShowing: true
            };
        }
        case EnumSpinner.SpinnerHide: {
            return {
                ...state,
                isShowing: false
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};

