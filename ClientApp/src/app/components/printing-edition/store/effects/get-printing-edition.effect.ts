import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';
import { SpinnerHide, SpinnerShow } from 'src/app/store/actions/spinner.action';
import { AppState } from 'src/app/store/state/app-state.state';
import { AdminService } from '../../../../service/admin.service';
import { PrintingEditionSuccessModel } from '../../models/printing-edition-success.model';
import * as printingEditionAction from '../actions/get-printing-edition.action';

@Injectable()
export class GetPrintingEditionEffect {
    constructor
    (
        private adminService: AdminService,
        private actions$: Actions,
        private store$: Store<AppState>
    )
    {}

    @Effect()
    GetPrintingEdition = this.actions$.pipe(
        ofType<printingEditionAction.GetPrintingEdition>(printingEditionAction.GetPrintingEditionEnum.GetPrintingEdition),
        mergeMap((action: printingEditionAction.GetPrintingEdition) =>
            this.adminService.getPrintingEdition(
                action.payload,
            ).pipe(
                map((model: PrintingEditionSuccessModel) => {
                    return new printingEditionAction.GetPrintingEditionSuccess(model);
                })
            ))
    );

    @Effect({dispatch: false})
    ShowSpinner = this.actions$.pipe(
        ofType<printingEditionAction.GetPrintingEdition>(printingEditionAction.GetPrintingEditionEnum.GetPrintingEdition),
        map(_ => this.store$.dispatch(new SpinnerShow()))
    )

    @Effect({dispatch: false})
    HideSpinner = this.actions$.pipe(
        ofType<printingEditionAction.GetPrintingEditionSuccess>(printingEditionAction.GetPrintingEditionEnum.GetPrintingEditionSuccess),
        map(_ => this.store$.dispatch(new SpinnerHide()))
    )

}
