import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, mergeMap } from "rxjs/operators";
import { SpinnerHide, SpinnerShow } from "src/app/store/actions/spinner.action";
import { AppState } from "src/app/store/state/app-state.state";
import { OrderService } from "../../../../service/order.service";
import * as getOrdersAction from '../actions/get-orders.action';


@Injectable()
export class GetOrdersEffect{
    
    constructor(
        private actions$: Actions,
        private orderService: OrderService,
        private store$: Store<AppState>
    ){}

    @Effect()
    GetOrders = this.actions$.pipe(
        ofType<getOrdersAction.GetOrders>(getOrdersAction.GetOrdersEnum.GetOrders),
        mergeMap((action: getOrdersAction.GetOrders) => 
            this.orderService.getOrders(
                    action.payload,
                    action.filter
                ).pipe(
                    map((model) => {
                        return new getOrdersAction.GetOrdersSuccess(model);
                    })
            ))
    );

    @Effect({dispatch: false})
    ShowSpinner = this.actions$.pipe(
        ofType<getOrdersAction.GetOrders>(getOrdersAction.GetOrdersEnum.GetOrders),
        map(_ => this.store$.dispatch(new SpinnerShow()))
    )

    @Effect({dispatch: false})
    HideSpinner = this.actions$.pipe(
        ofType<getOrdersAction.GetOrdersSuccess>(getOrdersAction.GetOrdersEnum.GetOrdersSuccess),
        map(_ => this.store$.dispatch(new SpinnerHide()))
    )

}