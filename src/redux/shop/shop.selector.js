import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectShopData = createSelector([selectShop], (shop) =>
  shop.SHOP_DATA ? shop.SHOP_DATA : []
);

export const selectIsDataFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

export const selectProduct = (productSkuParam) =>
  createSelector([selectShopData], (SHOP_DATA) =>
    SHOP_DATA
      ? SHOP_DATA.filter((item) => item.sku === parseInt(productSkuParam))
      : []
  );

export const selectIsDataFetched = createSelector(
  [selectShop],
  (shop) => !!shop.SHOP_DATA
);
