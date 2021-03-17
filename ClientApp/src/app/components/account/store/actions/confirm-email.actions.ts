import { Action } from '@ngrx/store';
import { ConfirmEmailModel } from '../../models/confirm-email.model';

export enum ConfirmEmailActionEnum{
    ConfirmEmail = '[CongirmEmail] ConfirmEmail',
    ConfirmEmailSuccess = '[ConfirmEmail] ConfirmEmailSuccess',
    ConfirmEmailError = '[ConfirmEmail] ConfirmEmailError'
}


export class ConfirmEmail implements Action{
    public readonly type = ConfirmEmailActionEnum.ConfirmEmail;
    constructor(public payload: ConfirmEmailModel){}
}

export class ConfirmEmailSuccess implements Action{
    public readonly type = ConfirmEmailActionEnum.ConfirmEmailSuccess;
    constructor(public payload: ConfirmEmailModel){}
}

export type ConfirmEmailAction = ConfirmEmail | ConfirmEmailSuccess;
