import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { AdminService } from '../../../../service/admin.service';
import { PrintingEditionSuccessModel } from '../../models/printing-edition-success.model';
import * as printingEditionAction from '../actions/get-printing-edition.action';

@Injectable()
export class GetPrintingEditionEffect {
    constructor
    (
        private adminService: AdminService,
        private actions$: Actions,
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

}
