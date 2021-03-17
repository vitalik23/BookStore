import { DeletePrintingEditionState, initialDeletePrintingEditionState} from '../state/delete-printing-edition.state';
import { DeltePrintingEditionAction, DeletePrintingEditionEnum} from '../actions/delete-printing-edition.action';


export const deletePrintingEditionReducer = (
    state = initialDeletePrintingEditionState,
    action: DeltePrintingEditionAction
): DeletePrintingEditionState => {
    switch (action.type){
        case DeletePrintingEditionEnum.DeletePrintingEdition: {
            return {
                ...state,
                id: action.payload
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};
