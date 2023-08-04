import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { CartListItem } from "../components/CartListItem";
import cart from "../data/cart";

interface ShoppingCartScreenProps {}

const ShoppingCartTotals = () => {
  return (
    <View style={styles.totalsContainer}>
      <View style={styles.row}>
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.text}>410.00 US$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery</Text>
        <Text style={styles.text}>50.00 US$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>460.00 US$</Text>
      </View>
    </View>
  );
};

const ShoppingCartScreen = ({}: ShoppingCartScreenProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={cart}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={() => <ShoppingCartTotals />}
      />
      <Button onPress={() => {}} label={"Checkout"} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  totalsContainer: {
    borderTopWidth: 1,
    borderColor: "gray",
    margin: 20,
    paddingTop: 10,
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
