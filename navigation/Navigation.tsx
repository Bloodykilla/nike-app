import { NavigationContainer } from "@react-navigation/native";

import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Back } from "../components/Back";
import { Bucket } from "../components/Bucket";
import HomeScreen from "../screens/HomeScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import ProductsScreen from "../screens/ProductsScreen";
import ShoppingCartScreen from "../screens/ShoppingCartScreen";
import { NavigationTypes } from "../types/Navigation";

const Stack = createNativeStackNavigator<NavigationTypes>();

const stackOptions: NativeStackNavigationOptions = {
  headerBackTitle: "Back",
  headerTitleAlign: "center",
  headerTintColor: "#000",
  headerLeft: () => <Back />,
  headerShadowVisible: false,
  contentStyle: {
    borderTopColor: "#000",
    borderTopWidth: 1,
  },
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={stackOptions}>
        <Stack.Screen
          name={"Home"}
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={"Products"}
          component={ProductsScreen}
          options={{
            title: "Products",
            headerRight: () => <Bucket />,
          }}
        />
        <Stack.Screen
          name={"ProductDetails"}
          component={ProductDetailsScreen}
          options={{
            title: "Product Details",
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name={"ShoppingCart"}
          component={ShoppingCartScreen}
          options={{
            title: "Shopping Cart",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
