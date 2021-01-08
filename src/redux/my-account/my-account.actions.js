import MY_ACCOUNT_ACTION_TYPES from './my-account-types';

export const setMyAccountTab = (tab) => ({
    type : MY_ACCOUNT_ACTION_TYPES.SET_MY_ACCOUNT_TAB,
    payload : tab
})