import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';
import { SpinnerHide, SpinnerShow } from 'src/app/store/actions/spinner.action';
import { AppState } from 'src/app/store/state/app-state.state';
import { AdminService } from '../../../../service/admin.service';
import * as clientListAction from '../actions/list-client.action';

@Injectable()
export class ClientListEffect {
    constructor
    (
        private adminService: AdminService,
        private actions$: Actions,
        private store$: Store<AppState>
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

    
    @Effect({dispatch: false})
    ShowSpinner = this.actions$.pipe(
        ofType<clientListAction.GetClientList>(clientListAction.ClientListActionEnum.GetClientList),
        map(_ => this.store$.dispatch(new SpinnerShow()))
    )

    @Effect({dispatch: false})
    HideSpinner = this.actions$.pipe(
        ofType<clientListAction.GetClientListSuccess>(clientListAction.ClientListActionEnum.GetClientListSuccess),
        map(_ => this.store$.dispatch(new SpinnerHide()))
    )

}
