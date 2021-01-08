import AddressActionTypes from "./address.action-types";

const INITIAL_STATE = {
  addresses: [],
  error: null,
  isAddressLoading: false,
};

const addressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AddressActionTypes.GET_ADDRESS_START:
    case AddressActionTypes.UPDATE_ADDRESS_START:
    case AddressActionTypes.DELETE_ADDRESS_START:
    case AddressActionTypes.POST_ADDRESS_START:
      return {
        ...state,
        isAddressLoading: true,
      };
    case AddressActionTypes.GET_ADDRESS_SUCCESS:
      return {
        ...state,
        isAddressLoading: false,
        addresses: action.payload,
      };

    case AddressActionTypes.UPDATE_ADDRESS_SUCCESS:
    case AddressActionTypes.DELETE_ADDRESS_SUCCESS:
    case AddressActionTypes.POST_ADDRESS_SUCCESS:
      return {
        ...state,
        isAddressLoading: false,
      };

    case AddressActionTypes.GET_ADDRESS_FAILURE:
    case AddressActionTypes.POST_ADDRESS_FAILURE:
    case AddressActionTypes.DELETE_ADDRESS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case AddressActionTypes.POP_ADDRESS_FROM_ARRAY:
      return {
        ...state,
        addresses: state.addresses.filter(
          (address) => address._id !== action.payload
        ),
      };
    case AddressActionTypes.MODIFY_ADDRESS_ARRAY:
      return {
        ...state,
        addresses: state.addresses.map((address) => {
          return address._id === action.payload._id ? action.payload : address;
        }),
      };

    case AddressActionTypes.RESET_ADDRESS : 
    return INITIAL_STATE

    default:
      return state;
  }
};

export default addressReducer;
