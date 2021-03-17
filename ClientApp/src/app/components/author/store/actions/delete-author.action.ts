import { Action } from '@ngrx/store';


export enum DeleteAuthorActionEnum{
    DeleteAuthor = '[DeleteAuthor] DeleteAuthor',
    DeleteAuthorSuccess = '[DeleteAuthor] DeleteAuthorSuccess'
}

export class DeleteAuthor implements Action{
    public readonly type = DeleteAuthorActionEnum.DeleteAuthor;
    constructor(public payload: number){}
}

export class DeleteAuthorSuccess implements Action{
    public readonly type = DeleteAuthorActionEnum.DeleteAuthorSuccess;
    constructor(public payload: number){}
}

export type DeleteAuthorAction = DeleteAuthor | DeleteAuthorSuccess;
