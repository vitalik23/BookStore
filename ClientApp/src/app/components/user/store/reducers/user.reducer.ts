import { ActionReducerMap } from '@ngrx/store';
import { UserState } from '../state/user.state';
import { profileReducers } from './profile.reducer';


export const userReducer = 'userReducer';

export const userReducers: ActionReducerMap<UserState> = {
    profileState: profileReducers,
};
