import { RefreshTokenState, initialRefreshTokenState } from '../state/refresh-token.state';
import { RefreshTokenActions , RefreshTokenEnum } from '../actions/refresh-token.action';



export const refreshReducer = (
    state = initialRefreshTokenState,
    action: RefreshTokenActions
): RefreshTokenState => {
    switch (action.type) {
        case RefreshTokenEnum.RefreshTokenSuccess: {
            return {
                ...state,
                tokens: action.payload
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};
