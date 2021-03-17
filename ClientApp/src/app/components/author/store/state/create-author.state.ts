import { AuthorModel } from '../../models/author.model';

export interface CreateAuthorState{
    authorModel: AuthorModel;
}

export const initialCreateAuthorState: CreateAuthorState = {
    authorModel: null,
};
