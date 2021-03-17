import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";
import { AdminService } from "../../../../service/admin.service";
import * as deletePEAction from '../actions/delete-printing-edition.action';


@Injectable()
export class DeletePrintingEditionEffect{
    constructor(
        private adminService: AdminService,
        private actions$: Actions
    ){}
    

    @Effect()
    DeletePE = this.actions$.pipe(
        ofType<deletePEAction.DeletePrintingEdition>(deletePEAction.DeletePrintingEditionEnum.DeletePrintingEdition),
        mergeMap((action: deletePEAction.DeletePrintingEdition) => 
            this.adminService.deletePrintingEdition(action.payload).pipe(
                map((id: number) => {
                    return new deletePEAction.DeletePrintingEditionSuccess(id);
                })
            ))
    )

    @Effect({dispatch: false})
    DeletePESuccess = this.actions$.pipe(
        ofType<deletePEAction.DeletePrintingEditionSuccess>(deletePEAction.DeletePrintingEditionEnum.DeletePrintingEditionSuccess),
        map(() => {
            window.location.reload();
        })
    )
}