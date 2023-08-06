import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/Button";
import { FiltersModal } from "../store/filters/FiltersModal";
import {
  selectVisibleProducts,
  setSelectedProduct,
} from "../store/products/products-slice";
import { NavigationTypes } from "../types/Navigation";

interface ProductsScreenProps {
  navigation: NativeStackNavigationProp<NavigationTypes>;
}

const ProductsScreen = ({ navigation }: ProductsScreenProps) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector(selectVisibleProducts);

  const productRedirectHandler = (id: string) => {
    dispatch(setSelectedProduct(id));
    navigation.navigate("ProductDetails");
  };

  const filterHandler = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.row}>
        <Text style={styles.text}>{products.length} Results</Text>
        <Button
          isOutline
          style={styles.filterButton}
          floated={false}
          label={"Filters"}
          onPress={() => filterHandler()}
          iconName="filter"
        />
      </View>
      {products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => productRedirectHandler(item.id)}
              style={styles.itemContainer}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
            </Pressable>
          )}
          numColumns={2}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.text}>There is no products.</Text>
        </View>
      )}

      <FiltersModal isActive={filterOpen} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterButton: {
    width: "auto",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  itemContainer: {
    width: "50%",
    padding: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  text: {
    fontWeight: "500",
  },
});

export default ProductsScreen;
