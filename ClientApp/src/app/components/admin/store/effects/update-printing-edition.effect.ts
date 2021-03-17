import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";
import { PrintingEdition } from "src/app/components/printing-edition/models/printing-edition.model";
import { Constants } from "src/app/constants/constants";
import { AdminService } from "../../../../service/admin.service";
import * as updatePEAction from '../actions/update-printing-edition.action';


@Injectable()
export class UpdatePrintingEditionEffect{
    constructor(
        private adminService: AdminService,
        private actions$: Actions
    ){}
    

    @Effect()
    UpdatePE = this.actions$.pipe(
        ofType<updatePEAction.UpdatePrintingEdition>(updatePEAction.UpdatePrintingEditionEnum.UpdatePrintingEdition),
        mergeMap((action: updatePEAction.UpdatePrintingEdition) => 
            this.adminService.updatePrintingEdition(action.payload).pipe(
                map((model: PrintingEdition) => {
                    return new updatePEAction.UpdatePrintingEditionSuccess(model);
                })
            ))
    )

    @Effect({dispatch: false})
    UpdatePESuccess = this.actions$.pipe(
        ofType<updatePEAction.UpdatePrintingEditionSuccess>(updatePEAction.UpdatePrintingEditionEnum.UpdatePrintingEditionSuccess),
        map(() => {
            window.location.href = Constants.LIST_PRINTING_EDITION;
        })
    )

}