import { AddPrintingEditionEnum, AddPrintingEditionActions } from '../actions/add-printing-edition.action';
import { initialAddPrintingEdition, AddPrintingEditionState } from '../state/add-printing-edition.state';


export const addPrintingEditionReducer = (
    state = initialAddPrintingEdition,
    action: AddPrintingEditionActions
): AddPrintingEditionState => {
    switch (action.type){
        case AddPrintingEditionEnum.AddPrintingEditionSuccess: {
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
