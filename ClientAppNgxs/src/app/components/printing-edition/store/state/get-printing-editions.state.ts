import { State, Action, StateContext, Selector, Store  } from '@ngxs/store';
import { mergeMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AddPrintingEdition, DeletePrintingEdition, GetPrintingEditions, UpdatePrintingEdition } from '../actions/get-printing-editions.action';
import { PrintingEditionModel } from '../../models/printing-edition.model';
import { SpinnerHide, SpinnerShow } from 'src/app/store/actions/spinner.action';



export class GetPrintingEditionsStateModel {
    data: PrintingEditionModel[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
}


@State<GetPrintingEditionsStateModel>({
    name: 'getPrintingEditions',
    defaults: {
        data: null,
        totalItems: null,
        pageNumber: 1,
        pageSize: 6,
    }
})

@Injectable()
export class GetPrintingEditionsState {
    constructor(
        private _adminService: AdminService,
        private store$: Store
    ) {

    }

    @Selector()
    static getData(state: GetPrintingEditionsStateModel) {
        return state.data;
    }

    @Selector()
    static getPageNumber(state: GetPrintingEditionsStateModel) {
        return state.pageNumber;
    }

    @Selector()
    static getPageSize(state: GetPrintingEditionsStateModel) {
        return state.pageSize;
    }

    @Selector()
    static getTotalItems(state: GetPrintingEditionsStateModel) {
        return state.totalItems;
    }

    @Action(GetPrintingEditions)
    getPrintingEditions({ getState, setState }: StateContext<GetPrintingEditionsStateModel>, { payload, filter }: GetPrintingEditions) {     
        this.store$.dispatch(new SpinnerShow());  
        return this._adminService.getPrintingsEdition(payload, filter).pipe(
            tap((result) => {
                const state = getState();
                setState({
                    ...state,
                    data: result.data,
                    pageNumber: result.pageNumber,
                    pageSize: result.pageSize,
                    totalItems: result.totalItems
                });
                this.store$.dispatch(new SpinnerHide());
            }
        )
        );
    }

    @Action(UpdatePrintingEdition)
    updatePrintingEdition({getState, setState}: StateContext<GetPrintingEditionsStateModel>, { payload }: UpdatePrintingEdition) {
        return this._adminService.updatePrintingEdition(payload).pipe(
            tap((result) => { 
                const state = getState();
                const listPrintingEdition = [...state.data];
                const printingEditionIndex = listPrintingEdition.findIndex(item => item.id === payload.id);
                listPrintingEdition[printingEditionIndex] = result;
                setState({
                    ...state,
                    data: listPrintingEdition
                })
            }
           
        ));
    }

    @Action(DeletePrintingEdition)
    deletePrintingEdition({getState, setState}: StateContext<GetPrintingEditionsStateModel>, { payload }: DeletePrintingEdition) {
        return this._adminService.deletePrintingEdition(payload).pipe(
            tap((result) => { 
                const state = getState();
                const listPrintingEdition = state.data.filter(item => item.id !== payload);
                setState({
                    ...state,
                    data: listPrintingEdition
                })
            }
           
        ));
    }

    @Action(AddPrintingEdition)
    addPrintingEdition({getState, patchState}: StateContext<GetPrintingEditionsStateModel>, { payload }: AddPrintingEdition) {
        return this._adminService.addPrintingEdition(payload).pipe(
            tap((result) => { 
                const state = getState();
                patchState({
                    data: [...state.data, result]
                })
            }
        ));
    }

}
