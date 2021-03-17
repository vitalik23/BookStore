import { GetPrintingEditionEnum, GetPrintingEditionActions } from '../actions/get-printing-edition.action';
import { GetPrintingEditionState, initialGetPrintingEditionState } from '../state/get-printing-edition.state';

export const getPrintingEditionReducer = (
    state = initialGetPrintingEditionState,
    action: GetPrintingEditionActions
): GetPrintingEditionState => {
    switch (action.type){
        case GetPrintingEditionEnum.GetPrintingEditionSuccess: {
            return {
                ...state,
                printingEdition: action.payload,
                authorsId: action.payload.authorsId
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};
