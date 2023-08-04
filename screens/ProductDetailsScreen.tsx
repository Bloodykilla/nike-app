import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Button } from "../components/Button";
import products from "../data/products";

interface ProductDetailsScreenProps {}

const ProductDetailsScreen = ({}: ProductDetailsScreenProps) => {
  const product = products[0];
  const { width } = useWindowDimensions();

  const addToCartHandler = () => {
    console.log("Hi!");
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
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>{product.price}</Text>
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
  description: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "300",
  },
});

export default ProductDetailsScreen;
