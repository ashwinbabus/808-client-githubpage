import MY_ACCOUNT_ACTION_TYPES from './my-account-types';

const INITIAL_STATE = {
    currentTab : "dashboard"
}

const myAccountReducer = (state = INITIAL_STATE , action) => {
    switch (action.type) {
        case MY_ACCOUNT_ACTION_TYPES.SET_MY_ACCOUNT_TAB:
            return{
                ...state,
                currentTab : action.payload
            }
        default:
            return state;
    }
} 

export default myAccountReducer