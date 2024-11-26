import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {theme} from '../core/theme'
import { ChooseCategory, DonorHomeScreen, ScheduleDelivery,  UploadClothes, UploadEdu, UploadFood } from '../screens';
const Stack=createStackNavigator();
const HomeStackNav = () => {
  return (
    
    <Stack.Navigator >
        <Stack.Screen name='Start' component={DonorHomeScreen}    options={{headerShown:false} }/>
        <Stack.Screen name='ChooseCategory' component={ChooseCategory} options={{headerShown:false} }/>
        <Stack.Screen name='ScheduleDelivery' component={ScheduleDelivery}
         options={{title:"Food", headerTitleStyle:{textAlign:'center'},
         headerTitleAlign:'center', headerStyle:{backgroundColor:theme.colors.charcoalBlack,height:70 },
          headerTintColor:theme.colors.ivory} }
        
        />
        <Stack.Screen name='UploadFood' component={UploadFood} 
         options={{title:"Food", headerTitleStyle:{textAlign:'center'},
         headerTitleAlign:'center', headerStyle:{backgroundColor:theme.colors.charcoalBlack,height:70 },
          headerTintColor:theme.colors.ivory} }/>

        <Stack.Screen name='UploadClothes' component={UploadClothes} 
         options={{title:"Clothes", headerTitleStyle:{textAlign:'center'},
         headerTitleAlign:'center', headerStyle:{backgroundColor:theme.colors.charcoalBlack,height:70 },
          headerTintColor:theme.colors.ivory} }/>

        <Stack.Screen name='UploadEdu' component={UploadEdu} 
        options={{title:"Education", headerTitleStyle:{textAlign:'center'},
         headerTitleAlign:'center', headerStyle:{backgroundColor:theme.colors.charcoalBlack,height:70 },
          headerTintColor:theme.colors.ivory} }/>






    </Stack.Navigator>
  )
}

export default HomeStackNav