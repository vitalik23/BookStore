import { initialUpdateAuthor, UpdateAuthorState } from '../state/update-author.state';
import { UpdateAuthorAction, UpdateAuthorActionEnum } from '../actions/update-author.action';


export const updateAuthorReducer = (
    state = initialUpdateAuthor,
    action: UpdateAuthorAction
): UpdateAuthorState => {
    switch (action.type){
        case UpdateAuthorActionEnum.UpdateAuthorSuccess: {
            return {
                ...state,
                authorModel: action.payload
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
}