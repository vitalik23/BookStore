import { AuthorModel } from '../../models/author.model';

export interface GetAuthorsState{
    data: AuthorModel[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
}

export const initialGetAuthorsState: GetAuthorsState = {
    data: null,
    pageNumber: 1,
    pageSize: 3,
    totalItems: null,
};
