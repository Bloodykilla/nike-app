import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart/cart-slice";
import { filtersReducer } from "./filters/filters-slice";
import { productsReducer } from "./products/products-slice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    filters: filtersReducer,
  },
});
