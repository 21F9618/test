import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {Education,Clothes,Food,HomeScreenRec,ClaimsHistory,ItemDetail,Notifications,RecepientStartScreen} from '../screens';
const Stack=createStackNavigator();
const HomeStackNav = () => {
  return (
    <Stack.Navigator >
        {/* <Stack.Screen name='Start' component={DonorHomeScreen}    options={{headerShown:false} }/>
        <Stack.Screen name='ChooseCategory' component={ChooseCategory} options={{headerShown:false} }/>
        <Stack.Screen name='ScheduleDelivery' component={ScheduleDelivery} options={{headerShown:false} }/>
        <Stack.Screen name='UploadFood' component={UploadFood} options={{headerShown:false} }/>
        <Stack.Screen name='UploadClothes' component={UploadClothes} options={{headerShown:false} }/>
        <Stack.Screen name='UploadEdu' component={UploadEdu} options={{headerShown:false} }/> */}

        <Stack.Screen name="Welcome Recepient!" component={HomeScreenRec}/>
        <Stack.Screen
              name="RecepientStartScreen"
              component={RecepientStartScreen}
              options={{ title: 'Welcome to Dast-e-Khair' }} // Optional: Customize header title
            />
        {/* <Stack.Screen
              name="ClaimsHistory"
              component={ClaimsHistory}
              options={{ title: 'ClaimsHistory' }} // Optional: Customize header title
            /> */}
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

           




    </Stack.Navigator>
  )
}

export default HomeStackNav