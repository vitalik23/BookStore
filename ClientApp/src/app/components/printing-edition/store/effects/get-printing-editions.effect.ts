import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';
import { SpinnerHide, SpinnerShow } from 'src/app/store/actions/spinner.action';
import { AppState } from 'src/app/store/state/app-state.state';
import { AdminService } from '../../../../service/admin.service';
import * as printingEditionAction from '../actions/get-printing-editions.action';

@Injectable()
export class GetPrintingEditionsEffect {
    constructor
        (
            private adminService: AdminService,
            private actions$: Actions,
            private store$: Store<AppState>
        ) { }

    @Effect()
    GetPrintingsEdition = this.actions$.pipe(

        ofType<printingEditionAction.GetPrintingEditions>(printingEditionAction.GetPrintingEditionsEnum.GetPrintingEditions),
        mergeMap((action: printingEditionAction.GetPrintingEditions) =>
            this.adminService.getPrintingsEdition(
                action.payload,
                action.filter
            ).pipe(
                map((model) => {
                    return new printingEditionAction.GetPrintingEditionsSuccess(model);
                })
            ))

    );

    @Effect({dispatch: false})
    ShowSpinner = this.actions$.pipe(
        ofType<printingEditionAction.GetPrintingEditions>(printingEditionAction.GetPrintingEditionsEnum.GetPrintingEditions),
        map(_ => this.store$.dispatch(new SpinnerShow()))
    )

    @Effect({dispatch: false})
    HideSpinner = this.actions$.pipe(
        ofType<printingEditionAction.GetPrintingEditionsSuccess>(printingEditionAction.GetPrintingEditionsEnum.GetPrintingEditionsSuccess),
        map(_ => this.store$.dispatch(new SpinnerHide()))
    )
}
