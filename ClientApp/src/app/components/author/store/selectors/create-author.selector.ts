import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthorModel } from '../../models/author.model';
import { authorReducers } from '../reducers/author.reducer';
import { AuthorState } from '../state/author.state';

const selectAuthor = createFeatureSelector<AuthorState>(authorReducers);

export const selectAuthorModel = createSelector(
    selectAuthor,
    (state: AuthorState): AuthorModel => state.createAuthorState.authorModel
);

