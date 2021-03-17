import { AuthorModel } from "../../../author/models/author.model";

export interface ListAuthorsState{
    authors: AuthorModel[];
}

export const initialListAuthorsState: ListAuthorsState = {
    authors: null
}