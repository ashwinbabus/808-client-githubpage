import OrdersActionTypes from './orders.action-types';

export const fetchUserOrdersStart = userId => ({
    type : OrdersActionTypes.FETCH_USER_ORDERS_START,
    payload : userId
})

export const fetchUserOrdersSuccess = orders => ({
    type : OrdersActionTypes.FETCH_USER_ORDERS_SUCCESS,
    payload : orders
})

export const fetchUserOrdersFailure = errors => ({
    type : OrdersActionTypes.FETCH_USER_ORDERS_FAILURE,
    payload : errors
})