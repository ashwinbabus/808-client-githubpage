    import ShopActions from './shop.action-types';

    export const fetchDataStart = () => ({
        type : ShopActions.FETCH_DATA_START
    });

    export const fetchDataSuccess = (data) => ({
        type : ShopActions.FETCH_DATA_SUCCESS,
        payload : data
    });

    export const fetchDataFailure = (error) => ({
        type : ShopActions.FETCH_DATA_FAILURE,
        payload : error
    })