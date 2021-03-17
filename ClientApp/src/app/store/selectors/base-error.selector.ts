import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../state/app-state.state';
import { appReducer } from '../reducers/app-reducer.reducer';


const selectError = createFeatureSelector<AppState>(appReducer);

export const getError = createSelector(
    selectError,
    (state: AppState) => state.errorMessage.errorMessage
);

