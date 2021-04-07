import { State, Action, StateContext, Selector, Store  } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { PrintingEditionModel } from '../../models/printing-edition.model';
import { GetPrintingEdition } from '../actions/get-printing-edition.action';
import { SpinnerHide, SpinnerShow } from 'src/app/store/actions/spinner.action';



export class GetPrintingEditionStateModel {
    data: PrintingEditionModel;
}


@State<GetPrintingEditionStateModel>({
    name: 'getPrintingEdition',
    defaults: {
        data: null,
    }
})

@Injectable()
export class GetPrintingEditionState {
    constructor(
        private _adminService: AdminService,
        private store$: Store
    ) {

    }

    @Selector()
    static getData(state: GetPrintingEditionStateModel) {
        return state.data;
    }

    @Action(GetPrintingEdition)
    getPrintingEdition({ getState, setState }: StateContext<GetPrintingEditionStateModel>, { payload }: GetPrintingEdition) {
        this.store$.dispatch(new SpinnerShow());  
        return this._adminService.getPrintingEdition(payload).pipe(
            tap((result) => {
                const state = getState();
                setState({
                    ...state,
                    data: result
                });
                this.store$.dispatch(new SpinnerHide());
            }
        ));
    }

}
