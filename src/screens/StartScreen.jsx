// src/screens/donor/Home.js

import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { theme } from "../core/theme";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
// import { LinearGradient } from 'expo-linear-gradient'

const Home = ({ navigation }) => {
  const tabBarHeight = useBottomTabBarHeight();

  return (

    <View style={[Styles.container, { marginBottom: tabBarHeight }]}>
      <ScrollView>
        <View style={Styles.banner}>
        <Image source={require('../../assets/items/d1.jpg') } style={{opacity:0.3, width:'100%', height:'100%',              position: 'relative'
        }} >

        </Image>
<Text style={Styles.heroText}>
              Hi Donor
            </Text>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 50,
          }}>
            <View>
            </View>
          </View>
        </View>

        <View style={{ color: theme.colors.ivory }}>
          <Text style={Styles.headings}>Donations</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', width: '90%', marginTop:20, gap:20 }}>
            <TouchableOpacity style={{alignItems:'center'}}>
              <Image source={require('../../assets/items/bookIC.png')} style={Styles.categories} />
              <Text style={{color:theme.colors.ivory, fontSize:15}}>Education</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{alignItems:'center'}}>
              <Image source={require('../../assets/items/clotheIC.png')} style={Styles.categories} />
              <Text style={{color:theme.colors.ivory, fontSize:15}}>Clothes</Text>

            </TouchableOpacity>

            <TouchableOpacity style={{alignItems:'center'}}>
              <Image source={require('../../assets/items/foodIC.png')} style={Styles.categories} />
              <Text style={{color:theme.colors.ivory, fontSize:15}}>Food</Text>

            </TouchableOpacity>

            <TouchableOpacity style={{alignItems:'center'}}>
              <Image source={require('../../assets/items/arrow.png')} style={Styles.categories} />
              <Text style={{color:theme.colors.ivory, fontSize:15}}>View all</Text>

            </TouchableOpacity>

            
          </View>
        </View>

        <View style={Styles.hero}>
          <View>
            <Image source={require('../../assets/items/d1.jpg')} style={{
              height: '100%',
              width: '100%',
              borderRadius: 20,
              position: 'relative'
            }} />
            <Text style={Styles.heroText}>
              Give to{"\n"}make a{"\n"}difference
            </Text>

            <Pressable
              style={({ pressed }) => [
                Styles.heroBttn,
                { backgroundColor: pressed ? theme.colors.sageGreen : 'rgba(0, 0, 0, 0.5)' } // Changes to sage green when pressed
              ]}
              onPress={() => navigation.navigate('ChooseCategory')}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>Donate Now</Text>
            </Pressable>
          </View>
        </View>

        <Text style={[Styles.headings, {marginTop:20}]}>Features</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("ScheduleDelivery")}
            style={Styles.optionCards}
          >
            <Image source={require('../../assets/items/scheduleDelivery.jpg')} style={{
              width: '100%',
              opacity: 0.8,
              height: '80%',
              borderColor: 'black',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }} />
            <Text style={{ color: theme.colors.ivory }}>Delivery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Detail")}
            style={Styles.optionCards}
          >
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Detail")}
            style={Styles.optionCards}
          >
          </TouchableOpacity>
        </ScrollView>
        <Text style={[Styles.headings, {marginTop:20}]}>Campaigns</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("ScheduleDelivery")}
            style={Styles.CampCards}
          >
            <Image source={require('../../assets/items/ngo1.jpg')} style={{
              width: '100%',
              opacity: 0.8,
              height: '80%',
              borderColor: 'black',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }} />
            <Text style={{ color: theme.colors.ivory }}>Delivery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Detail")}
            style={Styles.CampCards}
          >
          <Image source={require('../../assets/items/ngo3.jpg')} style={{
              width: '100%',
              opacity: 0.8,
              height: '80%',
              borderColor: 'black',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Detail")}
            style={Styles.CampCards}
          >
            <Image source={require('../../assets/items/ngo2.jpg')} style={{
              width: '100%',
              opacity: 0.8,
              height: '80%',
              borderColor: 'black',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }} />
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.charcoalBlack,
    flex: 1,
  },
  banner: {
    backgroundColor: theme.colors.TaupeBlack,
    height: 170,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  hero: {
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    marginTop: 30,
    height: 210,
    borderRadius: 20,
  },
  heroImg: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    position: 'relative',
  },
  heroBttn: {
    position: 'absolute',
    bottom: 10, // You can adjust the position as needed
    left: '65%',   // You can adjust the position as needed
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: make button semi-transparent
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  heroText: {
    position: 'absolute',
    top: 60,
    left: 20,
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  optionCards: {
    height: 150,
    backgroundColor: theme.colors.TaupeBlack,
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 20,
    width: 160,
    borderColor: theme.colors.sageGreen,
    borderWidth: 3,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  CampCards: {
    height: 220,
    backgroundColor: theme.colors.TaupeBlack,
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 20,
    width: 300,
    borderColor: theme.colors.sageGreen,
    borderWidth: 3,
    alignItems: 'center',
  },
  headings:{ color: theme.colors.ivory, fontSize: 23, paddingTop:20, fontWeight:"bold", marginLeft:10 },
  categories:{
    width: 70,
    height: 70,
    borderRadius: 35, // Half of width/height for perfect circle
    marginBottom: 8,
    position: 'relative',
    backgroundColor:theme.colors.sageGreen
  }
});

export default Home;
