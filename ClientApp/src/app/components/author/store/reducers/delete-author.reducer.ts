import { initialDeleteAuthorState, DeleteAuthorState } from '../state/delete-author.state';
import { DeleteAuthorActionEnum, DeleteAuthorAction } from '../actions/delete-author.action';

export const deleteAuthorReducer = (
    state = initialDeleteAuthorState,
    action: DeleteAuthorAction
): DeleteAuthorState => {
    switch (action.type){
        case DeleteAuthorActionEnum.DeleteAuthorSuccess: {
            return {
                ...state,
                authorId: action.payload
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};
