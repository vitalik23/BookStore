import { initialDeleteState, DeleteState} from '../state/delete.state';
import { DeleteAction , DeleteUserEnum} from '../actions/delete.action';


export const deleteReducer = (
    state = initialDeleteState,
    action: DeleteAction
): DeleteState => {
    switch (action.type){
        case DeleteUserEnum.DeleteUser: {
            return {
                ...state,
                id: action.payload
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};
