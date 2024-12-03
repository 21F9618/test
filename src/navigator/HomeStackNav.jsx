import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ChooseCategory, DonorHomeScreen, ScheduleDelivery,  UploadClothes, UploadEdu, UploadFood,ViewNgoPostsScreen,NgoPostDetailsScreen, DonorProfileForm } from '../screens';
import RecipientProfileForm from '../screens/RecipientProfileForm';
import NGOCampaignForm from '../screens/NGOCampaignForm';
import DonationSuccessScreen from '../screens/DonationSuccessScreen';
const Stack=createStackNavigator();
const HomeStackNav = () => {
  return (
    
    <Stack.Navigator >
        <Stack.Screen name='Start' component={DonorHomeScreen}    options={{headerShown:false} }/>
        <Stack.Screen name='ChooseCategory' component={ChooseCategory} options={{headerShown:false} }/>
        <Stack.Screen name='ScheduleDelivery' component={ScheduleDelivery} options={{headerShown:false} }/>
        <Stack.Screen name='UploadFood' component={UploadFood} options={{headerShown:false} }/>
        <Stack.Screen name='UploadClothes' component={UploadClothes} options={{headerShown:false} }/>
        <Stack.Screen name='UploadEdu' component={UploadEdu} options={{headerShown:false} }/>
        <Stack.Screen name='ViewNgoPostsScreen' component={ViewNgoPostsScreen} options={{headerShown:false} }/>
        <Stack.Screen name='DonorProfileForm' component={DonorProfileForm} options={{headerShown:false}}/>
        <Stack.Screen name='RecipientProfileForm' component={RecipientProfileForm} options={{headerShown:false}}/>
        <Stack.Screen name='NGOCampaignForm' component={NGOCampaignForm} options={{headerShown:false}}/>
        <Stack.Screen name='DonationSuccessScreen' component={DonationSuccessScreen} options={{headerShown:false}}/>





    </Stack.Navigator>
  )
}

export default HomeStackNav