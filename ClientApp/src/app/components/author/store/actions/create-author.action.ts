import { Action } from '@ngrx/store';
import { AuthorModel } from '../../models/author.model';

export enum CreateAuthorActionEnum{
    CreateAuthor = '[CreateAuthor] CreateAuthor',
    CreateAuthorSuccess = '[CreateAuthor] CreateAuthorSuccess',
}

export class CreateAuthor implements Action{
    public readonly type = CreateAuthorActionEnum.CreateAuthor;
    constructor(public payload: AuthorModel){}
}

export class CreateAuthorSuccess implements Action{
    public readonly type = CreateAuthorActionEnum.CreateAuthorSuccess;
    constructor(public payload: AuthorModel){}
}


export type CreateAuthorAction = CreateAuthor | CreateAuthorSuccess;
