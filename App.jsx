import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity } from "react-native";

import theme from "./src/core/theme"; // Ensure theme is imported correctly
import {
  RecepientStartScreen,
  Education,
  Cart,
  Food,
  Clothes,
  ItemDetail,
  DonationDetails,
} from "./src/screens";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Example of a nested navigator (Tab Navigator) for categories
// function CategoryTabNavigator() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Education" component={Education} />
//       <Tab.Screen name="Food" component={Food} />
//       <Tab.Screen name="Clothes" component={Clothes} />
//     </Tab.Navigator>
//   );
// }

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome Recepient!"
          screenOptions={{
            headerShown: true,
          }}
        >
          <Stack.Screen name="Welcome Recepient!" component={RecepientStartScreen} />
          
          {/* Navigate to the Tab Navigator */}
          {/* <Stack.Screen name="Categories" component={CategoryTabNavigator} /> */}
          <Stack.Screen name="Clothes" component={Clothes} />
          <Stack.Screen name="Education" component={Education} />
          <Stack.Screen name="Food" component={Food} />

          <Stack.Screen name="ItemDetail" component={ItemDetail} />
          <Stack.Screen
            name="DonationDetails"
            options={{ title: 'Donation Details' }}
            component={DonationDetails}
          />
          <Stack.Screen name="Cart" component={Cart} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
