import { initialDeleteState, DeleteState} from '../state/delete.state';
import { BlockUserAction , BlockUserEnum} from '../actions/block.action';


export const deleteReducer = (
    state = initialDeleteState,
    action: BlockUserAction
): DeleteState => {
    switch (action.type){
        case BlockUserEnum.BlockUnBlockUser: {
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
