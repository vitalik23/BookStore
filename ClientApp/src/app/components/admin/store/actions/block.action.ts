import { Action } from '@ngrx/store';

export enum BlockUserEnum {
    BlockUnBlockUser = '[BlockUser] BlockUser',
    BlockUnBlockUserSuccess = '[BlockUser] BlockUserSuccess',
}

export class BlockUnBlockUser implements Action{
    public readonly type = BlockUserEnum.BlockUnBlockUser;
    constructor(public payload: number){}
}

export class BlockUnBlockUserSuccess implements Action{
    public readonly type = BlockUserEnum.BlockUnBlockUserSuccess;
    constructor(public payload: number){}
}



export type BlockUserAction = BlockUnBlockUser | BlockUnBlockUserSuccess;
