import { Action } from '@ngrx/store';
import { RegisterModel } from '../../models/register.model';

export enum RegisterActionsEnum {
    Register = '[Register] Register',
    RegisterSuccess =  '[Register] RegisterSuccess',
}

export class Register implements Action{
    public readonly type = RegisterActionsEnum.Register;
    constructor(public payload: RegisterModel){}
}

export class RegisterSuccess implements Action{
    public readonly type = RegisterActionsEnum.RegisterSuccess;
    constructor(public payload: string){}
}


export type RegisterActions = Register | RegisterSuccess;
