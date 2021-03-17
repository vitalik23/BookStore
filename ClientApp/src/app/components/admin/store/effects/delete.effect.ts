import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AdminService } from '../../../../service/admin.service';
import * as deleteUserAction from '../actions/delete.action';

@Injectable()
export class DeleteEffect {
    constructor(
        private adminService: AdminService,
        private actions$: Actions,
        private router: Router
    )
    {}

    @Effect()
    DeleteUser: Observable<Action> = this.actions$.pipe(
        ofType<deleteUserAction.DeleteUser>(deleteUserAction.DeleteUserEnum.DeleteUser),
        map((action: deleteUserAction.DeleteUser) => action.payload),
        mergeMap((id: number) =>
            this.adminService.deleteUser(id).pipe(
                map(() =>
                {
                    return new deleteUserAction.DeleteUserSuccess(id);
                })
            ))
    );

    @Effect({dispatch: false})
    DeleteUserSuccess = this.actions$.pipe(
        ofType<deleteUserAction.DeleteUserSuccess>(deleteUserAction.DeleteUserEnum.DeleteUserSuccess),
        map(() => {
            window.location.reload();
        })
    )
}
