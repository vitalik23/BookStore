import { initialCreateAuthorState , CreateAuthorState} from '../state/create-author.state';
import { CreateAuthorAction, CreateAuthorActionEnum } from '../actions/create-author.action';


export const createAuthorReducer = (
    state = initialCreateAuthorState,
    action: CreateAuthorAction
): CreateAuthorState => {
    switch (action.type){
        case CreateAuthorActionEnum.CreateAuthor: {
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