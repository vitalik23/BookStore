import { GetPrintingEditionsEnum, GetPrintingEditionAction } from '../actions/get-printing-editions.action';
import { GetPrintingEditionsState, initialGetPrintingEditionsState } from '../state/get-printing-editions.state';

export const getPrintingEditionsReducer = (
    state = initialGetPrintingEditionsState,
    action: GetPrintingEditionAction
): GetPrintingEditionsState => {
    switch (action.type){
        case GetPrintingEditionsEnum.GetPrintingEditionsSuccess: {
            return {
                ...state,
                data: action.payload.data,
                pageNumber: action.payload.pageNumber,
                pageSize: action.payload.pageSize,
                totalItems: action.payload.totalItems,
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};
