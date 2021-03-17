import { UpdatePrintingEditionEnum, UpdatePrintingEditionAction } from '../actions/update-printing-edition.action';
import { UpdatePrintingEditionState, initialUpdatePrintingEditionState } from '../state/update-printing-edition.state';

export const updatePrintingEditionReducer = (
    state = initialUpdatePrintingEditionState,
    action: UpdatePrintingEditionAction
): UpdatePrintingEditionState => {
    switch (action.type){
        case UpdatePrintingEditionEnum.UpdatePrintingEditionSuccess: {
            return {
                ...state,
                printingEdition: action.payload
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};
