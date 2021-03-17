import { CreateAuthorState } from './create-author.state';
import { DeleteAuthorState } from './delete-author.state';
import { GetAuthorsState } from './get-authors.state';
import { UpdateAuthorState } from './update-author.state';

export interface AuthorState {
    createAuthorState: CreateAuthorState;
    getAuthorsState: GetAuthorsState;
    updateAuthorState: UpdateAuthorState;
    deleteAuthorState: DeleteAuthorState;
}
