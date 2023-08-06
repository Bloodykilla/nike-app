import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { Button } from "../components/Button";
import { CartListItem } from "../components/CartListItem";
import {
  selectDeliveryPrice,
  selectSelf,
  selectSubtotal,
  selectTotal,
} from "../store/cart/cart-slice";
import { NavigationTypes } from "../types/Navigation";

interface ShoppingCartScreenProps {
  navigation: NativeStackNavigationProp<NavigationTypes>;
}

const ShoppingCartTotals = () => {
  const subtotal = useSelector(selectSubtotal);
  const delivery = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);

  return (
    <View style={styles.totalsContainer}>
      <View style={styles.row}>
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.text}>{subtotal} US$</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.text}>Delivery</Text>
        <Text style={styles.text}>{delivery} US$</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>{total} US$</Text>
      </View>
    </View>
  );
};

const ShoppingCartScreen = ({ navigation }: ShoppingCartScreenProps) => {
  const cart = useSelector(selectSelf);

  const checkOutHandler = () => {
    if (cart.items.length > 0) {
      Alert.alert("Your order will be proceed.");
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {cart.items.length > 0 ? (
        <FlatList
          data={cart.items}
          renderItem={({ item }) => <CartListItem cartItem={item} />}
          ListFooterComponent={() => <ShoppingCartTotals />}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={[
              styles.text,
              {
                marginBottom: 80,
              },
            ]}
          >
            Your cart is empty.
          </Text>
        </View>
      )}

      <Button
        onPress={() => checkOutHandler()}
        label={cart.items.length > 0 ? "Checkout" : "Back to store"}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  totalsContainer: {
    borderColor: "black",
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
  textBold: {
    fontWeight: "500",
    fontSize: 16,
  },
});

export default ShoppingCartScreen;
