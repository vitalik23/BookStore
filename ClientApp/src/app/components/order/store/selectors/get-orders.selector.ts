import { createSelector, createFeatureSelector } from '@ngrx/store';
import { OrderItemModel } from '../../models/order-item.model';
import { orderReducer } from '../reducers/order.reducer';
import { OrderState } from '../state/order.state';

const selectGetOrdersClient = createFeatureSelector<OrderState>(orderReducer);

export const getData = createSelector(
    selectGetOrdersClient,
    (state: OrderState): OrderItemModel[] => state.getOrdersState?.data
);

export const getPageSize = createSelector(
    selectGetOrdersClient,
    (state: OrderState) => state.getOrdersState?.pageSize
);

export const getPageNumber = createSelector(
    selectGetOrdersClient,
    (state: OrderState) => state.getOrdersState?.pageNumber
);

export const getTotalItems = createSelector(
    selectGetOrdersClient,
    (state: OrderState) => state.getOrdersState?.totalItems
);