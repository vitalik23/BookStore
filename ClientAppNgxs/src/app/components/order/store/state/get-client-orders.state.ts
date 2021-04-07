import { State, Action, StateContext, Selector, Store  } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { OrderItemModel } from '../../models/order-item.model';
import { OrderService } from 'src/app/services/order.service';
import { CreateOrder, CreatePay, GetClientOrders } from '../actions/get-client-orders.action';
import { SpinnerHide, SpinnerShow } from 'src/app/store/actions/spinner.action';



export class GetClientOrdersStateModel {
    data: OrderItemModel[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
}


@State<GetClientOrdersStateModel>({
    name: 'getClientOrders',
    defaults: {
        data: null,
        totalItems: null,
        pageNumber: 1,
        pageSize: 6,
    }
})

@Injectable()
export class GetClientOrdersState {
    constructor(
        private _orderService: OrderService,
        private store$: Store
    ) {

    }

    @Selector()
    static getData(state: GetClientOrdersStateModel) {
        return state.data;
    }

    @Selector()
    static getPageNumber(state: GetClientOrdersStateModel) {
        return state.pageNumber;
    }

    @Selector()
    static getPageSize(state: GetClientOrdersStateModel) {
        return state.pageSize;
    }

    @Selector()
    static getTotalItems(state: GetClientOrdersStateModel) {
        return state.totalItems;
    }

    @Action(GetClientOrders)
    getClientOrders({ getState, setState }: StateContext<GetClientOrdersStateModel>, { payload }: GetClientOrders) {
        this.store$.dispatch(new SpinnerShow());  
        return this._orderService.getOrdersClient(payload).pipe(
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

    @Action(CreateOrder)
    createOrder({getState, patchState}: StateContext<GetClientOrdersStateModel>, { payload }: CreateOrder) {
        this.store$.dispatch(new SpinnerShow()); 
        return this._orderService.createOrder(payload).pipe(
            tap((result) => {
                const state = getState();
                patchState({
                    data: [...state.data, result]
                })
                localStorage.clear();
                this.store$.dispatch(new SpinnerHide());
            })
            
        );
        
    }

    @Action(CreatePay)
    createPay({getState, setState}: StateContext<GetClientOrdersStateModel>, { payload }: CreatePay) {
        return this._orderService.payOrder(payload).pipe(
            tap((result) => {
                const state = getState();
                const listOrders = [...state.data];
                const ordersIndex = state.data.findIndex(item => item.id === payload.orderId);
                listOrders[ordersIndex] = result;
                setState({
                    ...state,
                    data: listOrders
                })
            })
        )
    }

}
