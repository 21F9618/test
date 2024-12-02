import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./src/core/theme";
import {
  ChooseRole,
  LoginScreen,
  RChoose,
  RegisterIndividualScreen,
  RegisterNGOScreen,
  RegisterScreenDonor,
  ResetPasswordScreen,
  ScheduleDelivery,
  StartScreen,
  WaitForApprovalScreen,
  ViewNgoPostsScreen,
  
} from "./src/screens";
import TabNavigator from './src/navigator/TabNavigator';
import ScheduleRDeliveryScreen from "./src/screens/ScheduleRDeliveryScreen";
import RiderHomeScreen from "./src/screens/RiderHomeScreen";
import NgoPostDetailsScreen from "./src/screens/NgoPostDetailsScreen";
import DonorProfileForm from "./src/screens/DonorProfileForm";

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
<Stack.Screen name="StartScreen" component={StartScreen} />
<Stack.Screen name="ViewNgoPostsScreen" component={ViewNgoPostsScreen} />

<Stack.Screen name="RiderHomeScreen" component={RiderHomeScreen}/>
<Stack.Screen name="NgoPostDetailsScreen" component={NgoPostDetailsScreen}/>



<Stack.Screen name="RChoose" component={RChoose} />         
<Stack.Screen name="ChooseRole" component={ChooseRole} />
<Stack.Screen name="LoginScreen" component={LoginScreen} />   
<Stack.Screen name="RegisterScreenDonor" component={RegisterScreenDonor} />  
<Stack.Screen name="RegisterNGOScreen" component={RegisterNGOScreen} />  
<Stack.Screen name="RegisterIndividualScreen" component={RegisterIndividualScreen} />   
<Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} /> 
<Stack.Screen name="WaitForApprovalScreen" component={WaitForApprovalScreen} /> 
<Stack.Screen name="ScheduleDelivery" component={ScheduleDelivery} /> 
<Stack.Screen name="ScheduleRDeliveryScreen" component={ScheduleRDeliveryScreen}/>
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            




        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
