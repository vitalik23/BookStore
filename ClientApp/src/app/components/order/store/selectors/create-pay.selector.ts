import { createSelector, createFeatureSelector } from '@ngrx/store';
import { orderReducer } from '../reducers/order.reducer';
import { OrderState } from '../state/order.state';

const selectCreatePay = createFeatureSelector<OrderState>(orderReducer);

export const getPayModel = createSelector(
    selectCreatePay,
    (state: OrderState) => state.createPayState.payModel
);
