import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import theme from "./src/core/theme"; // Ensure theme is correctly defined
import { CartProvider } from "./src/CartContext"; // Ensure the path is correct
import {
  RecepientStartScreen,
  Education,
  Cart,
  Food,
  Clothes,
  ItemDetail,
} from "./src/screens"; // Ensure index.js correctly exports these

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
            <Stack.Screen
              name="Welcome Recepient!"
              component={RecepientStartScreen}
              options={{ title: 'Welcome to Dast-e-Khair' }} // Optional: Customize header title
            />
            <Stack.Screen
              name="Clothes"
              component={Clothes}
              options={{ title: 'Clothes Donations' }} // Optional: Customize header title
            />
            <Stack.Screen
              name="Education"
              component={Education}
              options={{ title: 'Education Donations' }} // Optional: Customize header title
            />
            <Stack.Screen
              name="Food"
              component={Food}
              options={{ title: 'Food Donations' }} // Optional: Customize header title
            />
            <Stack.Screen
              name="ItemDetail"
              component={ItemDetail}
              options={{ title: 'Item Details' }} // Optional: Customize header title
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{ title: 'Your Cart' }} // Optional: Customize header title
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </CartProvider>
  );
}
