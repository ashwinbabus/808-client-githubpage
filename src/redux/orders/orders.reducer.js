import UserActionTypes from '../user/user.action-types';
import OrdersActionTypes from './orders.action-types';

const INITIAL_STATE = {
    isLoading : false,
    orders:[],
    errors : null
}

const ordersReducer = (state = INITIAL_STATE , action) => {
    switch (action.type) {
        case OrdersActionTypes.FETCH_USER_ORDERS_START:
            return{
                ...state,
                isLoading : true
            }
        case OrdersActionTypes.FETCH_USER_ORDERS_SUCCESS:
            return{
                ...state,
                isLoading : false,
                orders : [...action.payload]
            }
        case OrdersActionTypes.FETCH_USER_ORDERS_FAILURE:
            return{
                ...state,
                isLoading : false,
                errors : action.payload
            }
        case UserActionTypes.SIGN_OUT:
            return{
                INITIAL_STATE
            }
        default:
            return state;
    }
}

export default ordersReducer;