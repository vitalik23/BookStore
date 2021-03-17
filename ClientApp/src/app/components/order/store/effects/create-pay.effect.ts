import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";
import { OrderService } from "../../../../service/order.service";
import { PaymentModel } from "../../models/payment.model";
import * as createPayAction from '../actions/create-pay.action';

@Injectable()
export class CreatePayEffect{
    
    constructor(
        private actions$: Actions,
        private orderService: OrderService
    ){}

    @Effect()
    CreatePay = this.actions$.pipe(
        ofType<createPayAction.CreatePay>(createPayAction.CreatePayEnum.CreatePay),
        mergeMap((action: createPayAction.CreatePay) =>
            this.orderService.payOrder(action.payload).pipe(
                map((model : PaymentModel) => {
                    return new createPayAction.CreatePaySuccess(model);
                })
            ))
    )
}