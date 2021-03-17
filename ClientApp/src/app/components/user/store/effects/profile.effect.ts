import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { UserProfile } from '../../models/user-profile.model';
import { UserService } from '../../../../service/user.service';
import * as profileAction from '../actions/profile.actions';

@Injectable()
export class ProfileEffect {
    constructor(
        private actions$: Actions,
        private userService: UserService,
    ) { }

    @Effect()
    Profile = this.actions$.pipe(
        ofType<profileAction.GetUser>(profileAction.GetUserActionsEnum.GetUser),
        switchMap(() => this.userService.profile()),
        switchMap((model: UserProfile) => {
            return of(new profileAction.GetUserSuccess(model));
        })
    );

    @Effect()
    Edit: Observable<Action> = this.actions$.pipe(
        ofType<profileAction.EditUser>(profileAction.GetUserActionsEnum.EditUser),
        mergeMap((action: profileAction.EditUser) =>
            this.userService.updateUser(action.payload).pipe(
                map((model: UserProfile) => {
                    return new profileAction.EditUserSuccess(model);
                })
            ))
    );

    @Effect({ dispatch: false })
    EditSuccess = this.actions$.pipe(
        ofType<profileAction.EditUserSuccess>(profileAction.GetUserActionsEnum.EditUserSuccess),
        map((action) => {
            window.location.reload();
        })
    );

}
