import { createSelector, createFeatureSelector } from '@ngrx/store';
import { OrderItemModel } from '../../models/order-item.model';
import { orderReducer } from '../reducers/order.reducer';
import { OrderState } from '../state/order.state';

const selectGetOrdersClient = createFeatureSelector<OrderState>(orderReducer);

export const getOrderItem = createSelector(
    selectGetOrdersClient,
    (state: OrderState): OrderItemModel[] => state.getOrdersClientState?.data
);

export const getPageSize = createSelector(
    selectGetOrdersClient,
    (state: OrderState) => state.getOrdersClientState?.pageSize
);

export const getPageNumber = createSelector(
    selectGetOrdersClient,
    (state: OrderState) => state.getOrdersClientState?.pageNumber
);

export const getTotalItems = createSelector(
    selectGetOrdersClient,
    (state: OrderState) => state.getOrdersClientState?.totalItems
);