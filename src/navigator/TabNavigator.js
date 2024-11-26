// src/navigator/TabNavigator.jsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Notifications from "../screens/Notifications";
import Cart from "../screens/Cart";

import { CartProvider } from '../CartContext'; // Import CartProvider

import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView,Image } from 'react-native';
import { theme } from "../core/theme";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import HomeStackNav from "./HomeStackNav";
import History from "./History";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <CartProvider>
    <Tab.Navigator 
    screenOptions={{
      tabBarShowLabel:false,
      tabBarHideOnKeyboard:true,
      tabBarStyle:styles.tabBarStyle,
      tabBarActiveTintColor:theme.colors.pearlWhite}}>
      
      <Tab.Screen name="Start-nav" component={HomeStackNav} options={{headerShown:false,
        tabBarIcon:({color})=> <Entypo name="home" size={24} color={color} />
      } }/>
      <Tab.Screen name="Notifications" component={Notifications} options={{headerShown:false,
        tabBarIcon:({color})=> <Ionicons name="notifications" size={24} color={color} />
      } }/>
     
<Tab.Screen name="Cart" component={Cart} options={{headerShown:false,
        tabBarIcon:({color})=> <Ionicons name="cart" size={24} color={color} />
      } }/>
      <Tab.Screen name="History" component={History} options={{headerShown:false,
        tabBarIcon:({color})=> <Entypo name="user" size={24} color={color} />
      } }/>
      
        

    </Tab.Navigator>
    </CartProvider>
  );
}
const styles=StyleSheet.create({
  tabBarStyle:{
    height:40,
    position:'absolute',
    backgroundColor:theme.colors.charcoalBlack,
    borderTopWidth:0,
    borderTopColor:'transparent',
    elevation:0

  }
 
})

export default TabNavigator;