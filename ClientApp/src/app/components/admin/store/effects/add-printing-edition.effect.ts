import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { PrintingEdition } from "src/app/components/printing-edition/models/printing-edition.model";
import { AdminService } from "../../../../service/admin.service";
import * as actionPrintingEdition from '../actions/add-printing-edition.action';


@Injectable()
export class AddPrintingEditionEffect{
    
    constructor(
        private actions$: Actions,
        private adminService: AdminService
    ){}

    @Effect()
    AddPrintingEdition: Observable<Action> = this.actions$.pipe(
        ofType<actionPrintingEdition.AddPrintingEdition>(actionPrintingEdition.AddPrintingEditionEnum.AddPrintingEdition),
        mergeMap((action: actionPrintingEdition.AddPrintingEdition) => 
            this.adminService.addPrintingEdition(action.payload).pipe(
                map((model: PrintingEdition) => {
                    return new actionPrintingEdition.AddPrintingEditionSuccess(model);
                })
            ))
    )

    @Effect({dispatch: false})
    AddPrintingEditionSuccess = this.actions$.pipe(
        ofType<actionPrintingEdition.AddPrintingEditionSuccess>(actionPrintingEdition.AddPrintingEditionEnum.AddPrintingEditionSuccess),
        map(() => {
            window.location.reload();
        })
    )
}