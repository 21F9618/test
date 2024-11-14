import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { theme } from "./src/core/theme";
import {
  StartScreen,
  LoginScreen,
  ResetPasswordScreen,
  HomeScreen,
  ChooseRole,
  WaitForApprovalScreen,
  RegisterScreenRecipient,
  RegisterNGOScreen,
  RegisterIndividualScreen,
  DonorChoose,
  RChoose,
} from "./src/screens";
import RegisterScreenDonor from "./src/screens/RegisterScreenDonor";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="ChooseRole" component={ChooseRole} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreenDonor" component={RegisterScreenDonor} />
          <Stack.Screen name="RegisterNGOScreen" component={RegisterNGOScreen} />
          <Stack.Screen name="RegisterIndividualScreen" component={RegisterIndividualScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="WaitForApprovalScreen" component={WaitForApprovalScreen} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}/>
          <Stack.Screen name="RChoose" component={RChoose}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
