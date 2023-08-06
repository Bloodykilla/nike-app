import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/Button";
import { Size } from "../components/Size";
import { addCartItem } from "../store/cart/cart-slice";
import { NavigationTypes } from "../types/Navigation";
import { ProductTypes } from "../types/Product";
import { StateTypes } from "../types/State";

interface ProductDetailsScreenProps {
  navigation: NativeStackNavigationProp<NavigationTypes>;
}

const ProductDetailsScreen = ({ navigation }: ProductDetailsScreenProps) => {
  const [warning, setWarning] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const product: ProductTypes = useSelector(
    (state: StateTypes) => state.products.selectedProduct
  );

  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const selectSizeHandler = (value: number) => {
    setWarning("");

    if (selectedSize !== value) {
      setSelectedSize(value);
    } else {
      setSelectedSize(null);
    }
  };

  const mock = {
    product: product,
    size: selectedSize,
  };

  const addToCartHandler = () => {
    if (!selectedSize) {
      setWarning("Please, select the size of shoes.");
      return;
    }

    dispatch(addCartItem(mock));
    navigation.goBack();
  };

  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <FlatList
          horizontal
          data={product.images}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image
              style={{
                width: width,
                aspectRatio: 1,
              }}
              source={{ uri: item }}
            />
          )}
        />

        <View
          style={{
            padding: 20,
          }}
        >
          {product.name && <Text style={styles.title}>{product.name}</Text>}
          {product.price && <Text style={styles.price}>{product.price} $</Text>}
          {product.sizes && product.sizes.length && (
            <>
              <Text style={styles.sizes}>Available Sizes:</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {product.sizes.map((size) => (
                  <Size
                    key={size}
                    value={size}
                    isActive={selectedSize === size ? true : false}
                    onPress={() => selectSizeHandler(size)}
                  />
                ))}
              </View>
            </>
          )}
          {warning && <Text style={styles.warningText}>{warning}</Text>}
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      <Button onPress={() => addToCartHandler()} label={"Add to cart"} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "500",
    marginVertical: 10,
  },
  price: {
    fontWeight: "500",
    fontSize: 16,
  },
  sizes: {
    marginVertical: 10,
    fontWeight: "500",
    fontSize: 16,
  },
  description: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "300",
  },
  warningText: {
    fontWeight: "400",
    color: "red",
    fontSize: 16,
    marginTop: 10,
  },
});

export default ProductDetailsScreen;
