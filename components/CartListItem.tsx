import { Feather } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { changeQuantity } from "../store/cart/cart-slice";
import { OrderTypes } from "../types/Order";

interface CartListItemProps {
  cartItem: OrderTypes;
}

export const CartListItem = ({ cartItem }: CartListItemProps) => {
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    dispatch(changeQuantity({ productId: cartItem.product.id, amount: 1 }));
  };

  const decreaseQuantity = () => {
    dispatch(changeQuantity({ productId: cartItem.product.id, amount: -1 }));
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: cartItem.product.image }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{cartItem.product.name}</Text>
        <Text style={styles.size}>Size {cartItem.size}</Text>

        <View style={styles.footer}>
          <Feather
            onPress={decreaseQuantity}
            name="minus-circle"
            size={24}
            color="black"
          />
          <Text style={styles.quantity}>{cartItem.quantity}</Text>
          <Feather
            onPress={increaseQuantity}
            name="plus-circle"
            size={24}
            color="black"
          />
          <Text style={styles.itemTotal}>{cartItem.product.price} $</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
  },
  image: {
    width: "40%",
    aspectRatio: 1,
  },
  name: {
    fontWeight: "500",
    fontSize: 22,
    marginBottom: 4,
  },
  size: {
    fontSize: 14,
    color: "gray",
  },
  quantity: {
    marginHorizontal: 10,
    fontWeight: "bold",
    color: "black",
  },
  footer: {
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  itemTotal: {
    fontSize: 16,
    marginLeft: "auto",
    fontWeight: "500",
  },
});
