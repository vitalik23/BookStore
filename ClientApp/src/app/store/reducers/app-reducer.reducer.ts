import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state/app-state.state';
import { errorReducer } from './base-error.reducer';
import *  as listAuthors from '../../components/admin/store/actions/list-authors.action';
import * as printingEditionAction from '../../components/printing-edition/store/actions/get-printing-edition.action'

export const appReducer = "appReducer";


export const appReducers: ActionReducerMap<AppState> = {
    errorMessage: errorReducer,
};

export function clearState(reducer) {
    return function (state, action) {
        
        if(action.type != printingEditionAction.GetPrintingEditionEnum.GetPrintingEditionSuccess &&
           action.type != listAuthors.ListAuthorsEnum.ListAuthors){
            state = undefined;
        }     
        return reducer(state, action);
    };
}