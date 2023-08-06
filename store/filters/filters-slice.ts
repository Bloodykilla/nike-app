import { createSlice } from "@reduxjs/toolkit";
import { FilterTypes } from "../../types/Filter";
import { StateTypes } from "../../types/State";
import {
  PRICE_INITIAL_STATE,
  SIZE_INITIAL_STATE,
  SORT_INITIAL_STATE,
} from "./const";

const initialState: FilterTypes = {
  prices: PRICE_INITIAL_STATE,
  sizes: SIZE_INITIAL_STATE,
  sortBy: SORT_INITIAL_STATE,
};

const filtersSlice = createSlice({
  name: "@@filters",
  initialState,
  reducers: {
    setPrices: (state, action) => {
      state.prices = action.payload;
    },
    setSizes: (state, action) => {
      state.sizes = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    clearFilter: (state) => {
      state.prices = PRICE_INITIAL_STATE;
      state.sizes = SIZE_INITIAL_STATE;
      state.sortBy = SORT_INITIAL_STATE;
    },
  },
});

export const filtersReducer = filtersSlice.reducer;
export const { setPrices, setSizes, setSortBy, clearFilter } =
  filtersSlice.actions;

export const selectFilters = (state: StateTypes) => state.filters;
