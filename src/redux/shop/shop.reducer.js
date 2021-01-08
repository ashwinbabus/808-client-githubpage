import ShopActions from "./shop.action-types";

const INITIAL_STATE = {
  SHOP_DATA: null,
  isFetching: false,
  error: undefined,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActions.FETCH_DATA_START:
      return { 
        ...state, 
        isFetching: true 
      };
    case ShopActions.FETCH_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        SHOP_DATA: action.payload,
      };
    case ShopActions.FETCH_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
