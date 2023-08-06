export type PriceTypes = {
  id: number | null;
  label: string;
  from: number | null;
  to: number | null;
};

export type FilterTypes = {
  prices: PriceTypes[];
  sizes: number[];
  sortBy: {
    label: string;
    value: string;
    id: number;
  };
};
