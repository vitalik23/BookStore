import { ActionReducerMap } from '@ngrx/store';
import { AuthorState } from '../state/author.state';
import { createAuthorReducer } from './create-author.reducer';
import { deleteAuthorReducer } from './delete-author.reducer';
import { getAuthorsReducer } from './get-authors.reducer';
import { updateAuthorReducer } from './update-author.reducer';

export const authorReducers = 'authorReducers';

export const authorReducer: ActionReducerMap<AuthorState> = {
    createAuthorState: createAuthorReducer,
    getAuthorsState: getAuthorsReducer,
    updateAuthorState: updateAuthorReducer,
    deleteAuthorState: deleteAuthorReducer,
};
