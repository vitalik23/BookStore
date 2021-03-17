import { ClientListActionEnum, GetListClient } from '../actions/list-client.action';
import { initialClientState, ListClientState } from '../state/list-client.state';

export const getClientReducer = (
    state = initialClientState,
    action: GetListClient
): ListClientState => {
    switch (action.type){
        case ClientListActionEnum.GetClientListSuccess: {
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
