import { FilterTypes } from "./Filter";
import { OrderTypes } from "./Order";
import { ProductTypes } from "./Product";

export type StateTypes = {
  products: {
    products: ProductTypes[];
    selectedProduct: ProductTypes;
  };
  cart: {
    items: OrderTypes[];
    deliveryPrice: number;
    freeDeliveryFrom: number;
  };
  filters: FilterTypes;
};
