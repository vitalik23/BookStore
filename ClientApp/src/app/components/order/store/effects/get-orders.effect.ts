import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";
import { OrderService } from "../../../../service/order.service";
import * as getOrdersAction from '../actions/get-orders.action';


@Injectable()
export class GetOrdersEffect{
    
    constructor(
        private actions$: Actions,
        private orderService: OrderService
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
}