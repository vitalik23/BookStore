import { GetMaxPricePrintingEditionEnum, GetMaxPricePrintingEditionActions } from '../actions/get-maxprice-printing-edition.action';
import { GetMaxPricePrintingEditionState, initialGetMaxPricePrintingEditionState } from '../state/get-maxprice-printing-edition.state';

export const getMaxPricePrintingEditionReducer = (
    state = initialGetMaxPricePrintingEditionState,
    action: GetMaxPricePrintingEditionActions
): GetMaxPricePrintingEditionState => {
    switch (action.type){
        case GetMaxPricePrintingEditionEnum.GetMaxPricePrintingEditionSuccess: {
            return {
                ...state,
                maxPrice: action.payload,
                
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};
