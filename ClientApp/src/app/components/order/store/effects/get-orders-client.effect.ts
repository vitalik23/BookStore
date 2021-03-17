import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";
import { OrderService } from "../../../../service/order.service";
import * as getOrdersClientAction from '../actions/get-orders-client.action';


@Injectable()
export class GetOrdersClientEffect{
    
    constructor(
        private actions$: Actions,
        private orderService: OrderService
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
}