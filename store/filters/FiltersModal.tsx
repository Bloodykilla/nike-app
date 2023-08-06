import { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet, { BottomSheetRefProps } from "../../components/BottomSheet";
import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { RadioButton } from "../../components/RadioButton";
import { Size } from "../../components/Size";
import { priceRange } from "../../data/priceRange";
import { sizesData } from "../../data/sizes";
import { sortBy } from "../../data/sortBy";
import { PriceTypes } from "../../types/Filter";
import { FilterOptions } from "./FilterOptions";
import {
  PRICE_INITIAL_STATE,
  SIZE_INITIAL_STATE,
  SORT_INITIAL_STATE,
} from "./const";
import {
  clearFilter,
  selectFilters,
  setPrices,
  setSizes,
  setSortBy,
} from "./filters-slice";

interface FiltersModalProps {
  isActive: boolean;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const FiltersModal = ({ isActive }: FiltersModalProps) => {
  const ref = useRef<BottomSheetRefProps>(null);
  const filters = useSelector(selectFilters);
  const [selectedSizes, setSelectedSize] = useState(filters.sizes);
  const [selectedPrice, setSelectedPrice] = useState(filters.prices);
  const [selectedSort, setSelectedSort] = useState(filters.sortBy);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isActive) {
      ref?.current?.scrollTo(-SCREEN_HEIGHT + 140);
    } else {
      ref.current?.scrollTo(0);
    }
  }, [isActive]);

  const sizeSelectHandler = (value: number) => {
    setSelectedSize(
      !selectedSizes.find((el) => el === value)
        ? [...selectedSizes, value]
        : selectedSizes.filter((el) => el !== value)
    );
  };

  const priceSelectHandler = (value: PriceTypes) => {
    setSelectedPrice(
      selectedPrice.length && selectedPrice.some((el) => el.id === value.id)
        ? selectedPrice.filter((el) => el.id !== value.id)
        : [...selectedPrice, value]
    );
  };

  const sortSelectHandler = (value: (typeof sortBy)[0]) => {
    setSelectedSort(selectedSort.id === value.id ? SORT_INITIAL_STATE : value);
  };

  //TODO: Refactor
  const cleanOptionsHandler = useCallback(() => {
    setSelectedPrice(PRICE_INITIAL_STATE);
    setSelectedSize(SIZE_INITIAL_STATE);
    setSelectedSort(SORT_INITIAL_STATE);
    dispatch(clearFilter());
  }, [filters]);

  const applyFilterOptionsHandler = () => {
    Promise.all([
      dispatch(setPrices(selectedPrice)),
      dispatch(setSizes(selectedSizes)),
      dispatch(setSortBy(selectedSort)),
    ]).then(() => {
      ref?.current?.scrollTo(0);
    });
  };

  return (
    <BottomSheet ref={ref}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Filter</Text>
        <View style={styles.filtersContainer}>
          <FilterOptions label={"Sort By"}>
            {sortBy.map((sort) => (
              <RadioButton
                key={sort.id}
                label={sort.label}
                isActive={selectedSort.id === sort.id ? true : false}
                onPress={() => sortSelectHandler(sort)}
              />
            ))}
          </FilterOptions>
          <FilterOptions label={"Shop By Price"}>
            {priceRange.map((price) => (
              <Checkbox
                key={price.id}
                label={price.label}
                isActive={
                  selectedPrice.some((el) => el.id === price.id) ? true : false
                }
                onPress={() => priceSelectHandler(price)}
              />
            ))}
          </FilterOptions>
          <FilterOptions label={"Size"} direction="row">
            {sizesData.map((size) => (
              <Size
                key={size}
                value={size}
                isActive={
                  selectedSizes.find((el) => el === size) ? true : false
                }
                onPress={() => sizeSelectHandler(size)}
              />
            ))}
          </FilterOptions>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            style={styles.button}
            isOutline={true}
            onPress={() => cleanOptionsHandler()}
            floated={false}
            label={"Clear"}
          />
          <Button
            style={styles.button}
            onPress={() => applyFilterOptionsHandler()}
            floated={false}
            label={"Apply"}
          />
        </View>
      </ScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    marginBottom: 12,
  },
  filtersContainer: {
    flexDirection: "column",
    gap: 10,
  },
  textLabel: {
    fontWeight: "500",
    fontSize: 16,
    color: "#000",
  },
  buttonsContainer: {
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  button: {
    flex: 1,
  },
});
