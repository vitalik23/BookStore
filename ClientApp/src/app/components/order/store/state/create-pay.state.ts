import { PaymentModel } from "../../models/payment.model";

export interface CreatePayState{
    payModel: PaymentModel;
}

export const initialCreatePayState: CreatePayState = {
    payModel: null
}