import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state/app-state.state';
import { errorReducer } from './base-error.reducer';
import { spinnerReducer } from './spinner.reducer';
import * as errorAction from '../actions/base-error.action';

export const appReducer = "appReducer";


export const appReducers: ActionReducerMap<AppState> = {
    errorMessage: errorReducer,
    spinner: spinnerReducer
};

export function clearState(reducer) {
    return function (state, action) {
        
        if(action.type != errorAction.EBaseError.GetError){
            return reducer(state, action);
        }     
        return reducer(undefined, action);
    };
}