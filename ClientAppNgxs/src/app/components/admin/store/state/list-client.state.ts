import { State, Action, StateContext, Selector, Store  } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { UserModel } from 'src/app/components/user/models/user.model';
import { DeleteUser, GetClientList, UpdateUser } from '../actions/list-client.action';
import { UserFilterModel } from '../../models/user-filter.model';
import { SpinnerHide, SpinnerShow } from 'src/app/store/actions/spinner.action';



export class GetClientListStateModel {
    data: UserModel[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
}


@State<GetClientListStateModel>({
    name: 'getClientList',
    defaults: {
        data: null,
        totalItems: null,
        pageNumber: 1,
        pageSize: 5,
    }
})

@Injectable()
export class GetClientListState {
    constructor(
        private _adminService: AdminService,
        private store$: Store
    ) {

    }

    @Selector()
    static getData(state: GetClientListStateModel) {
        return state.data;
    }

    @Selector()
    static getPageNumber(state: GetClientListStateModel) {
        return state.pageNumber;
    }

    @Selector()
    static getPageSize(state: GetClientListStateModel) {
        return state.pageSize;
    }

    @Selector()
    static getTotalItems(state: GetClientListStateModel) {
        return state.totalItems;
    }

    @Action(GetClientList)
    listClient({ getState, setState }: StateContext<GetClientListStateModel>, { payload, filter }: GetClientList) {
        this.store$.dispatch(new SpinnerShow());  
        return this._adminService.getClients(payload, filter).pipe(
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
        ));
    }

    @Action(DeleteUser)
    deleteUser({getState, setState}: StateContext<GetClientListStateModel>, {payload}: DeleteUser){
        return this._adminService.deleteUser(payload).pipe(
            tap((result) => {
                const state = getState();
                const filteredData = state.data.filter(item => item.id !== payload);
                setState({
                    ...state, 
                    data: filteredData
                });
            })
        )
    }

    @Action(UpdateUser)
    updateUser({getState, setState}: StateContext<GetClientListStateModel>, { payload }: UpdateUser) {
        return this._adminService.updateUser(payload).pipe(
            tap((result) => {
                const state = getState();
                const listClient = [...state.data];
                const clientIndex = listClient.findIndex(item => item.id === payload.id);
                listClient[clientIndex] = result;

                setState({
                    ...state,
                    data: listClient
                });
            })
        );
    }


}
