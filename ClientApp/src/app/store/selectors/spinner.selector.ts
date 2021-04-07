import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../state/app-state.state';
import { appReducer } from '../reducers/app-reducer.reducer';


const selectSpinner = createFeatureSelector<AppState>(appReducer);

export const isSpinnerShow = createSelector(
    selectSpinner,
    (state: AppState) => state.spinner.isShowing
);

