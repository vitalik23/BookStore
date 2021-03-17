import { Action } from '@ngrx/store';

export const enum DeleteUserEnum{
    DeleteUser = '[DeleteUser] DeleteUser',
    DeleteUserSuccess = '[DeleteUser] DeleteUserSuccess',
    DeleteUserError = '[DeleteUser] DeleteUserError'
}

export class DeleteUser implements Action{
    public readonly type = DeleteUserEnum.DeleteUser;
    constructor(public payload: number){}
}

export class DeleteUserSuccess implements Action{
    public readonly type = DeleteUserEnum.DeleteUserSuccess;
    constructor(public payload: number){}
}


export type DeleteAction = DeleteUser | DeleteUserSuccess;
