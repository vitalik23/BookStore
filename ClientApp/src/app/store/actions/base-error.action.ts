import { Action } from "@ngrx/store";

export enum EBaseError{
    GetError = "[Error] GetError"
}

export class GetError implements Action{
    public readonly type = EBaseError.GetError;
    constructor(public payload: string){}
}

export type BaseErrorActions = GetError;