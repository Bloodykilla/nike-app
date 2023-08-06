import { createSelector, createSlice } from "@reduxjs/toolkit";
import { StateTypes } from "../../types/State";

const initialState: StateTypes["cart"] = {
  items: [],
  deliveryPrice: 15,
  freeDeliveryFrom: 200,
};

const cartSlice = createSlice({
  name: "@@cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      if (
        state.items.find((el) => el.product.id === action.payload.product.id)
      ) {
        return;
      }

      const newProduct = action.payload.product;
      const size = action.payload.size;
      //@ts-ignore
      state.items.push({ product: newProduct, size, quantity: 1 });
    },
    changeQuantity: (state, action) => {
      const { productId, amount } = action.payload;
      const cartItem = state.items.find((el) => el.product.id === productId);

      if (cartItem) {
        cartItem.quantity += amount;
      }

      if (cartItem && cartItem.quantity <= 0) {
        state.items = state.items.filter((el) => el.product.id !== productId);
      }
    },
  },
});

export const selectNumberOfItems = (state: StateTypes) =>
  state.cart.items.length;

export const selectSubtotal = (state: StateTypes) =>
  state.cart?.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

export const selectSelf = (state: StateTypes) => state.cart;

export const selectDeliveryPrice = createSelector(
  selectSelf,
  selectSubtotal,
  (state, subtotal) =>
    subtotal > state?.freeDeliveryFrom ? 0 : state?.deliveryPrice
);

export const selectTotal = createSelector(
  selectSubtotal,
  selectDeliveryPrice,
  (subtotal, delivery) => subtotal + delivery
);

export const cartReducer = cartSlice.reducer;
export const { addCartItem, changeQuantity } = cartSlice.actions;
