import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ChooseCategory, ScheduleDelivery, StartScreen, UploadFood } from '../screens';
const Stack=createStackNavigator();
const HomeStackNav = () => {
  return (
    <Stack.Navigator >
              <Stack.Screen name='Start' component={StartScreen}    options={{headerShown:false} }/>

              <Stack.Screen name='ChooseCategory' component={ChooseCategory}/>


        <Stack.Screen name='ScheduleDelivery' component={ScheduleDelivery} options={{headerShown:false} }/>
        <Stack.Screen name='UploadFood' component={UploadFood} options={{headerShown:false} }/>




    </Stack.Navigator>
  )
}

export default HomeStackNav