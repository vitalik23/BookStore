import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";
import { OrderService } from "../../../../service/order.service";
import * as createOrderAction from '../actions/create-order.action';
import { Constants } from "src/app/constants/constants";
import { OrderItemModel } from "../../models/order-item.model";

@Injectable()
export class CreateOrderEffect{
    
    constructor(
        private actions$: Actions,
        private orderService: OrderService
    ){}

    @Effect()
    CreateOrder = this.actions$.pipe(
        ofType<createOrderAction.CreateOrder>(createOrderAction.CreateOrderEnum.CreateOrder),
        mergeMap((action: createOrderAction.CreateOrder) =>
            this.orderService.createOrder(action.payload).pipe(
                map((model: OrderItemModel[]) => {
                    return new createOrderAction.CreateOrderSuccess(model);
                })
            ))
    )

    @Effect({dispatch: false})
    CreateOrderSuccess = this.actions$.pipe(
        ofType<createOrderAction.CreateOrderSuccess>(createOrderAction.CreateOrderEnum.CreateOrderSuccess),
        map(() => {
            localStorage.removeItem(Constants.CART);
            alert(Constants.SUCCESSFULY_COMPLITED_ORDER);
            window.location.href = Constants.ROUTE_MAIN_PAGE;
        })
    )
}