import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import { selectNumberOfItems } from "../store/cart/cart-slice";
import { NavigationTypes } from "../types/Navigation";

type BucketScreenNavigationProp = NativeStackNavigationProp<
  NavigationTypes,
  "ShoppingCart"
>;

export const Bucket = () => {
  const navigation = useNavigation<BucketScreenNavigationProp>();
  const cartLength = useSelector(selectNumberOfItems);

  const redirectToCartHandler = () => {
    navigation.navigate("ShoppingCart");
  };

  return (
    <Pressable style={styles.container} onPress={() => redirectToCartHandler()}>
      <FontAwesome5 name={"shopping-cart"} size={18} color={"black"} />
      {cartLength > 0 && (
        <Text style={{ marginLeft: 2, fontWeight: "500" }}>{cartLength}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 24,
    height: 24,
    marginHorizontal: 8,
    position: "relative",
  },
});
