import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthorModel } from '../../models/author.model';
import { authorReducers } from '../reducers/author.reducer';
import { AuthorState } from '../state/author.state';

const selectUpdateAuthor = createFeatureSelector<AuthorState>(authorReducers);

export const selectAuthorModel = createSelector(
    selectUpdateAuthor,
    (state: AuthorState): AuthorModel => state.updateAuthorState.authorModel
);


