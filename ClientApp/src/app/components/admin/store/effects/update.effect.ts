import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { UserProfile } from 'src/app/components/user/models/user-profile.model';
import { AdminService } from '../../../../service/admin.service';
import * as updateAction from '../actions/update.action';

@Injectable()
export class UpdateEffect{
    constructor(
        private adminService: AdminService,
        private actions$: Actions
    )
    {}

    @Effect()
    Update = this.actions$.pipe(
        ofType<updateAction.Update>(updateAction.UpdateActionEnum.Update),
        mergeMap((action: updateAction.Update) => 
            this.adminService.updateUser(action.payload).pipe(
                map((model: UserProfile) => {
                    return new updateAction.UpdateSuccess(model);
                })
            ))
    )

    @Effect({dispatch: false})
    UpdateSuccess = this.actions$.pipe(
        ofType<updateAction.UpdateSuccess>(updateAction.UpdateActionEnum.UpdateSuccess),
        map(() => {
            window.location.reload();
        })
    )
}