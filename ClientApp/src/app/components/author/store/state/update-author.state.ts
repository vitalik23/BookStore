import { AuthorModel } from '../../models/author.model';

export interface UpdateAuthorState{
    authorModel: AuthorModel;
}

export const initialUpdateAuthor: UpdateAuthorState = {
    authorModel: null,
};
