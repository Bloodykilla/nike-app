export type OrderTypes = {
  product: {
    id: number;
    image: string;
    name: string;
    price: number;
  };
  freeDeliveryFrom?: number;
  deliveryPrice?: number;
  size: number;
  quantity: number;
};
