import { createSelector, createSlice } from "@reduxjs/toolkit";
import products from "../../data/products";
import { FilterTypes, PriceTypes } from "../../types/Filter";
import { ProductTypes } from "../../types/Product";
import { StateTypes } from "../../types/State";

interface InitialStateProps {
  products: ProductTypes[];
  selectedProduct: ProductTypes | null;
}

const initialState: InitialStateProps = {
  products: products,
  selectedProduct: null,
};

const productsSlice = createSlice({
  name: "@@products",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      //@ts-ignore
      state.selectedProduct = state.products.find(
        (el) => el?.id === action.payload
      );
    },
  },
});

const sortProducts = (
  products: ProductTypes[],
  sortBy: FilterTypes["sortBy"]
) => {
  return [...products].sort((a, b) =>
    sortBy.value === "DESC" ? b.price - a.price : a.price - b.price
  );
};

const filterProductsByPrice = (
  products: ProductTypes[],
  prices: PriceTypes[]
) => {
  if (prices.length === 0) return products;

  const { from } = prices.reduce((prev, current) => {
    return prev.from! < current.from! ? prev : current;
  });

  const { to } = prices.reduce((prev, current) => {
    return prev.from! > current.from! ? prev : current;
  });

  return products.filter((el) => el.price >= from! && el.price <= to!);
};

const filterProductsBySize = (products: ProductTypes[], sizes: number[]) => {
  if (sizes.length === 0) return products;

  return products.filter((el) => {
    return el.sizes.some((size) => sizes.includes(size));
  });
};

export const selectVisibleProducts = createSelector(
  (state: StateTypes) => state.products.products,
  (state: StateTypes) => state.filters.sortBy,
  (state: StateTypes) => state.filters.prices,
  (state: StateTypes) => state.filters.sizes,
  (products, sortBy, prices, sizes) => {
    let filteredProducts = sortProducts(products, sortBy);
    filteredProducts = filterProductsByPrice(filteredProducts, prices);
    filteredProducts = filterProductsBySize(filteredProducts, sizes);
    return filteredProducts;
  }
);

export const { setSelectedProduct } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
