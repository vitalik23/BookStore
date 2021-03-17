import { Action } from '@ngrx/store';
import { AuthorModel } from '../../models/author.model';

export enum UpdateAuthorActionEnum{
    UpdateAuthor = '[UpdateAuthor] UpdateAuthor',
    UpdateAuthorSuccess = '[UpdateAuthor] UpdateAuthorSuccess',
    UpdateAuthorError = '[UpdateAuthor] UpdateAuthorError'
}

export class UpdateAuthor implements Action{
    public readonly type = UpdateAuthorActionEnum.UpdateAuthor;
    constructor(public payload: AuthorModel){}
}

export class UpdateAuthorSuccess implements Action{
    public readonly type = UpdateAuthorActionEnum.UpdateAuthorSuccess;
    constructor(public payload: AuthorModel){}
}


export type UpdateAuthorAction = UpdateAuthor | UpdateAuthorSuccess ;
