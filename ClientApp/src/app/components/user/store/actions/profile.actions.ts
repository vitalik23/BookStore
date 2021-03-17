import { Action } from '@ngrx/store';
import { UserProfile } from '../../models/user-profile.model';

export enum GetUserActionsEnum {
    GetUser = '[User] GetUser',
    GetUserSuccess = '[User] GetUserSuccess',
    GetUserError = '[User] GetUserError',
    EditUser = '[User] EditUser',
    EditUserSuccess = '[User] EditUserSuccess',
    EditUserError = '[User] EditUserError'
}

export class GetUser implements Action {
    public readonly type = GetUserActionsEnum.GetUser;
}

export class GetUserSuccess implements Action {
    public type = GetUserActionsEnum.GetUserSuccess;
    constructor(public payload: UserProfile) {}
}

export class EditUser implements Action {
    public type = GetUserActionsEnum.EditUser;
    constructor(public payload: UserProfile) {}
}

export class EditUserSuccess implements Action {
    public type = GetUserActionsEnum.EditUserSuccess;
    constructor(public payload: UserProfile) {}
}


export type GetUserAction = GetUserSuccess | GetUser | EditUserSuccess | EditUser ;
