import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthorModel } from '../../models/author.model';
import { authorReducers } from '../reducers/author.reducer';
import { AuthorState } from '../state/author.state';

const selectGetAuthor = createFeatureSelector<AuthorState>(authorReducers);

export const selectAuthorModel = createSelector(
    selectGetAuthor,
    (state: AuthorState): AuthorModel[] => state.getAuthorsState?.data
);

export const getPageNumber = createSelector(
    selectGetAuthor,
    (state: AuthorState) => state.getAuthorsState?.pageNumber
);

export const getPageSize = createSelector(
    selectGetAuthor,
    (state: AuthorState) => state.getAuthorsState?.pageSize
);

export const getTotalItems = createSelector(
    selectGetAuthor,
    (state: AuthorState) => state.getAuthorsState?.totalItems
);



