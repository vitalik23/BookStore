import { Action } from "@ngrx/store";
import { PaymentModel } from "../../models/payment.model";

export enum CreatePayEnum{
    CreatePay = "[CreatePay] CreatePay",
    CreatePaySuccess = "[CreatePay] CreatePaySuccess",
}

export class CreatePay implements Action{
    public readonly type = CreatePayEnum.CreatePay;
    constructor(public payload: PaymentModel){}
}

export class CreatePaySuccess implements Action{
    public readonly type = CreatePayEnum.CreatePaySuccess;
    constructor(public payload: PaymentModel){}
}

export type CreatePayActions = CreatePay | CreatePaySuccess;