import { createSelector }  from 'reselect';

const selectAddress = state => state.addresses;

export const selectAddresses = createSelector(
    [selectAddress],
    addresses => addresses.addresses
);

export const selectIsAddressLoading = createSelector(
    [selectAddress],
    addresses => addresses.isAddressLoading
)

