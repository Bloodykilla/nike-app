import { FilterTypes, PriceTypes } from "../../types/Filter";

export const SIZE_INITIAL_STATE: number[] = [];
export const PRICE_INITIAL_STATE: PriceTypes[] = [];
export const SORT_INITIAL_STATE: FilterTypes["sortBy"] = {
  label: "",
  value: "",
  id: 0,
};
