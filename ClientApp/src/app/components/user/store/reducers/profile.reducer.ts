import { GetUserActionsEnum, GetUserAction } from '../actions/profile.actions';
import { initialProfileState, UserProfileState } from '../state/profile.state';


export const profileReducers = (
    state = initialProfileState,
    action: GetUserAction
): UserProfileState => {
    switch (action.type){
        case GetUserActionsEnum.GetUserSuccess: {
            return {
                ...state,
                profileModel: action.payload,
            };
        }
        case GetUserActionsEnum.EditUser: {
            return {
                ...state,
                profileModel: action.payload
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};
