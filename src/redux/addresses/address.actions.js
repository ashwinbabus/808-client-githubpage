import AddressActionTypes from "./address.action-types";

export const getAddressStart = (user_id) => ({
  type: AddressActionTypes.GET_ADDRESS_START,
  payload: user_id,
});

export const getAddressSuccess = (address) => ({
  type: AddressActionTypes.GET_ADDRESS_SUCCESS,
  payload: address,
});

export const getAddressFailure = (error) => ({
  type: AddressActionTypes.GET_ADDRESS_FAILURE,
  payload: error,
});

export const postAddressStart = (user_id) => ({
  type: AddressActionTypes.POST_ADDRESS_START,
  payload: user_id,
});

export const postAddressSuccess = (userId) => ({
  type: AddressActionTypes.POST_ADDRESS_SUCCESS,
  payload : userId
});

export const postAddressFailure = (error) => ({
  type: AddressActionTypes.POST_ADDRESS_FAILURE,
  payload: error,
});

export const updateAddressStart = (newAddr) => ({
  type: AddressActionTypes.UPDATE_ADDRESS_START,
  payload: newAddr,
});

export const updateAddressSuccess = () => ({
  type: AddressActionTypes.UPDATE_ADDRESS_SUCCESS,
});

export const updateAddressFailure = (error) => ({
  type: AddressActionTypes.UPDATE_ADDRESS_FAILURE,
  payload: error,
});

export const deleteAddressStart = (user_id) => ({
  type: AddressActionTypes.DELETE_ADDRESS_START,
  payload: user_id,
});

export const deleteAddressSuccess = () => ({
  type: AddressActionTypes.DELETE_ADDRESS_SUCCESS,
});

export const deleteAddressFailure = (error) => ({
  type: AddressActionTypes.DELETE_ADDRESS_FAILURE,
  payload: error,
});


export const popAddressFromArray = (_id) => ({
  type : AddressActionTypes.POP_ADDRESS_FROM_ARRAY,
  payload : _id
})

export const modifyAddressArray = (data) => ({
  type : AddressActionTypes.MODIFY_ADDRESS_ARRAY,
  payload : data
})

export const resetAddressWhenUserLogsOut = () => ({
  type : AddressActionTypes.RESET_ADDRESS
})