import { Action } from "@ngrx/store";
import { Token } from "src/app/models/token.model";

export enum RefreshTokenEnum{
    RefreshToken = "[RefreshToken] RefreshToken",
    RefreshTokenSuccess = "[RefreshToken] RefreshTokenSuccess"
}

export class RefreshToken implements Action{
    public readonly type = RefreshTokenEnum.RefreshToken;
    constructor(public payload: Token){}
}

export class RefreshTokenSuccess implements Action{
    public readonly type = RefreshTokenEnum.RefreshTokenSuccess;
    constructor(public payload: Token){}
}

export type RefreshTokenActions = RefreshTokenSuccess | RefreshToken;