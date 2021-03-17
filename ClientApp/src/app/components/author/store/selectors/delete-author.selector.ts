import { createSelector, createFeatureSelector } from '@ngrx/store';
import { authorReducers } from '../reducers/author.reducer';
import { AuthorState } from '../state/author.state';

const selectDeleteAuthor = createFeatureSelector<AuthorState>(authorReducers);

export const selectAuthorId = createSelector(
    selectDeleteAuthor,
    (state: AuthorState) => state.deleteAuthorState?.authorId
);
