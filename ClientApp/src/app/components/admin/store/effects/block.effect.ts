import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AdminService } from '../../../../service/admin.service';
import * as blockUserAction from '../actions/block.action';


@Injectable()
export class BlockEffect{
    constructor(
        private adminService: AdminService,
        private actions$: Actions
    )
    {}

    @Effect()
    BlockUnBlockUser: Observable<Action> = this.actions$.pipe(
        ofType<blockUserAction.BlockUnBlockUser>(blockUserAction.BlockUserEnum.BlockUnBlockUser),
        map((action: blockUserAction.BlockUnBlockUser) => action.payload),
        mergeMap((id: number) => 
            this.adminService.blockUser(id).pipe(
                map(() => {
                    return new blockUserAction.BlockUnBlockUserSuccess(id);
                })
            ))
    );

}