import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./src/core/theme";
import {
  LoginScreen,
  
} from "./src/screens";
import TabNavigator from './src/navigator/TabNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >

         
<Stack.Screen name="LoginScreen" component={LoginScreen} />
            
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            




        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
