import { createFeatureSelector, createSelector } from "@ngrx/store";
import { adminReducer } from "../reducers/admin.reducer";
import { AdminState } from "../state/admin.state";


const selectGetAuthor = createFeatureSelector<AdminState>(adminReducer);

export const listAuthors = createSelector(
    selectGetAuthor,
    (state) => state.listAuthorsState?.authors
);
