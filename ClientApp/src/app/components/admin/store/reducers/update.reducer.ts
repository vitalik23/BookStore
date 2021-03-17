import { initialUpdateState , UpdateState} from '../state/update.state';
import { UpdateAction , UpdateActionEnum } from '../actions/update.action';

export const updateReducer = (
    state = initialUpdateState,
    action: UpdateAction
): UpdateState => {
    switch(action.type){
        case UpdateActionEnum.UpdateSuccess: {
            return{
                ...state,
                updateUserModel: action.payload
            };
        }
        default: {
            return{
                ...state
            };
        }
    }
};
