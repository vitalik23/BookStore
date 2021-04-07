import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, mergeMap } from "rxjs/operators";
import { SpinnerHide, SpinnerShow } from "src/app/store/actions/spinner.action";
import { AppState } from "src/app/store/state/app-state.state";
import { OrderService } from "../../../../service/order.service";
import * as getOrdersClientAction from '../actions/get-orders-client.action';


@Injectable()
export class GetOrdersClientEffect{
    
    constructor(
        private actions$: Actions,
        private orderService: OrderService,
        private store$: Store<AppState>
    ){}

    @Effect()
    GetOrdersClient = this.actions$.pipe(
        ofType<getOrdersClientAction.GetOrdersClient>(getOrdersClientAction.GetOrdersClientEnum.GetOrdersClient),
        mergeMap((action: getOrdersClientAction.GetOrdersClient) => 
            this.orderService.getOrdersClient(
                action.payload
                ).pipe(
                    map((model) => {
                        return new getOrdersClientAction.GetOrdersClientSuccess(model);
                    })
            ))
    );

    @Effect({dispatch: false})
    ShowSpinner = this.actions$.pipe(
        ofType<getOrdersClientAction.GetOrdersClient>(getOrdersClientAction.GetOrdersClientEnum.GetOrdersClient),
        map(_ => this.store$.dispatch(new SpinnerShow()))
    )

    @Effect({dispatch: false})
    HideSpinner = this.actions$.pipe(
        ofType<getOrdersClientAction.GetOrdersClientSuccess>(getOrdersClientAction.GetOrdersClientEnum.GetOrdersClientSuccess),
        map(_ => this.store$.dispatch(new SpinnerHide()))
    )

}