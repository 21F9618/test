import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import theme from "./src/core/theme";
import { CartProvider } from "./src/CartContext";
import {
  RecepientStartScreen,
  Education,
  Cart,
  Food,
  Clothes,
  ItemDetail,
} from "./src/screens";

const Stack = createStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Welcome Recepient!"
            screenOptions={{
              headerShown: true,
            }}
          >
            <Stack.Screen name="Welcome Recepient!" component={RecepientStartScreen} />
            <Stack.Screen name="Clothes" component={Clothes} />
            <Stack.Screen name="Education" component={Education} />
            <Stack.Screen name="Food" component={Food} />
            <Stack.Screen name="ItemDetail" component={ItemDetail} />
            <Stack.Screen name="Cart" component={Cart} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </CartProvider>
  );
}
