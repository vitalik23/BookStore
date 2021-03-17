import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { AdminService } from '../../../../service/admin.service';
import * as clientListAction from '../actions/list-client.action';

@Injectable()
export class ClientListEffect {
    constructor
    (
        private adminService: AdminService,
        private actions$: Actions,
    )
    {}

    @Effect()
    GetClients = this.actions$.pipe(
        ofType<clientListAction.GetClientList>(clientListAction.ClientListActionEnum.GetClientList),
        mergeMap((action: clientListAction.GetClientList) =>
            this.adminService.getClients(
                action.payload,
                action.filter
            ).pipe(
                map((model) => {
                    return new clientListAction.GetClientListSuccess(model);
                })
            ))
    );

}
