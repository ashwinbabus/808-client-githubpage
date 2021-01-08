const { createSelector } = require("reselect")

const selectOrders = state => state.orders

export const selectOrdersArray = createSelector(
    [selectOrders],
    orders => orders.orders
)

export const selectOrdersLoading = createSelector(
    [selectOrders],
    orders => orders.isLoading
)