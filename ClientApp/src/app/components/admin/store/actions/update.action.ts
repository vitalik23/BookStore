import { Action } from '@ngrx/store';
import { UserProfile } from 'src/app/components/user/models/user-profile.model';

export enum UpdateActionEnum{
    Update = '[Update] Update',
    UpdateSuccess = '[Update] UpdateSuccess',
    UpdateError = '[Update] UpdateError'

}

export class Update implements Action{
    public type = UpdateActionEnum.Update;
    constructor(public payload: UserProfile){}
}

export class UpdateSuccess implements Action{
    public type = UpdateActionEnum.UpdateSuccess;
    constructor(public payload: UserProfile){}
}




export type UpdateAction = Update | UpdateSuccess ;

