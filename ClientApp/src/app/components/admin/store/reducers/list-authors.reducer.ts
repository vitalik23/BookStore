import { ListAuthorsState, initialListAuthorsState } from '../state/list-authors.state';
import { ListAuthorsEnum, ListAuthorsActions } from '../actions/list-authors.action';

export const listAuthorsReducer = (
    state = initialListAuthorsState,
    action: ListAuthorsActions
): ListAuthorsState => {
    switch (action.type){
        case ListAuthorsEnum.ListAuthors: {
            return {
                ...state
            }
        }
        case ListAuthorsEnum.ListAuthorsSuccess: {
            return {
                ...state,
                authors: action.payload
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
}
