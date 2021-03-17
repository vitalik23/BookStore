import { initialGetAuthorsState, GetAuthorsState } from '../state/get-authors.state';
import { GetAuthorsAction, GetAuthorsActionEnum } from '../actions/get-authors.action';


export const getAuthorsReducer = (
    state = initialGetAuthorsState,
    action: GetAuthorsAction
): GetAuthorsState => {
    switch (action.type){
        case GetAuthorsActionEnum.GetAuthorsSuccess: {
            return {
                ...state,
                data: action.payload.data,
                totalItems: action.payload.totalItems,
                pageNumber: action.payload.pageNumber,
                pageSize: action.payload.pageSize,
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};
