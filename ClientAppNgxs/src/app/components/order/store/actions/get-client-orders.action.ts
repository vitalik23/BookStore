import { PageQuery } from "src/app/models/page-query";
import { OrderItemModel } from "../../models/order-item.model";
import { PaymentModel } from "../../models/payment.model";


export class GetClientOrders{
    static readonly type = '[ClientOrder] GetClientOrders';
    constructor(public payload: PageQuery){}
}

export class CreateOrder{
    static readonly type = '[ClientOrder] CreateOrder';
    constructor(public payload: OrderItemModel[]){}
}

export class CreatePay{
    static readonly type = '[ClientOrder] CreatePay';
    constructor(public payload: PaymentModel){}
}