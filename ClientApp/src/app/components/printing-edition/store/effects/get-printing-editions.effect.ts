import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { AdminService } from '../../../../service/admin.service';
import * as printingEditionAction from '../actions/get-printing-editions.action';

@Injectable()
export class GetPrintingEditionsEffect {
    constructor
    (
        private adminService: AdminService,
        private actions$: Actions,
    )
    {}

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

}
