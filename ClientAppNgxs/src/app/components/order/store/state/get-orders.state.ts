import { State, Action, StateContext, Selector, Store  } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { OrderItemModel } from '../../models/order-item.model';
import { OrderService } from 'src/app/services/order.service';
import { GetOrders } from '../actions/get-orders.action';
import { SpinnerHide, SpinnerShow } from 'src/app/store/actions/spinner.action';



export class GetOrdersStateModel {
    data: OrderItemModel[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
}


@State<GetOrdersStateModel>({
    name: 'getOrders',
    defaults: {
        data: null,
        totalItems: null,
        pageNumber: 1,
        pageSize: 6,
    }
})

@Injectable()
export class GetOrdersState {
    constructor(
        private _orderService: OrderService,
        private store$: Store
    ) {

    }

    @Selector()
    static getData(state: GetOrdersStateModel) {
        return state.data;
    }

    @Selector()
    static getPageNumber(state: GetOrdersStateModel) {
        return state.pageNumber;
    }

    @Selector()
    static getPageSize(state: GetOrdersStateModel) {
        return state.pageSize;
    }

    @Selector()
    static getTotalItems(state: GetOrdersStateModel) {
        return state.totalItems;
    }

    @Action(GetOrders)
    getOrders({ getState, setState }: StateContext<GetOrdersStateModel>, { payload, filter }: GetOrders) {
        this.store$.dispatch(new SpinnerShow());  
        return this._orderService.getOrders(payload, filter).pipe(
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


}
