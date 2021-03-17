import { createSelector, createFeatureSelector } from '@ngrx/store';
import { orderReducer } from '../reducers/order.reducer';
import { OrderState } from '../state/order.state';

const selectCreateOrder = createFeatureSelector<OrderState>(orderReducer);

export const getOrderItem = createSelector(
    selectCreateOrder,
    (state: OrderState) => state.createOrderState.orderItems
);
