import { Action } from '@ngrx/store';
import { PageQuery } from 'src/app/models/page/page-query.model';
import { PageResponse } from 'src/app/models/page/page-response.model';
import { AuthorFilter } from '../../models/author-filter.model';

export enum GetAuthorsActionEnum {
    GetAuthors = '[GetAuthors] GetAuthors',
    GetAuthorsSuccess = '[GetAuthors] GetAuthorsSuccess',
    GetAuthorsError = '[GetAuthors] GetAuthorsError'

}

export class GetAuthors implements Action{
    public readonly type = GetAuthorsActionEnum.GetAuthors;
    constructor(public payload: PageQuery, public filter: AuthorFilter){}
}

export class GetAuthorsSuccess implements Action{
    public readonly type = GetAuthorsActionEnum.GetAuthorsSuccess;
    constructor(public payload: PageResponse){}
}


export type GetAuthorsAction = GetAuthors | GetAuthorsSuccess;
