import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {ClaimsHistory, Profile} from '../screens';
const Stack=createStackNavigator();
const History = ({route}) => {
  return (
    <Stack.Navigator >
      
            <Stack.Screen
              name="Profile"
              component={Profile}options={{headerShown:false}}initialParams={{ ...route.params }}
            />
        <Stack.Screen
              name="ClaimsHistory"
              component={ClaimsHistory}
              options={{ title: 'ClaimsHistory' }} // Optional: Customize header title
            />
             
           



    </Stack.Navigator>
  )
}

export default History;