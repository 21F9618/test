import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { theme } from '../core/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const CircleLogoStepper = () => {
  return (
    
    <View style={styles.container}>
      <View style={styles.step}>
        <View style={styles.circleContainer}>
          <View style={styles.circle}>
            <MaterialCommunityIcons name="cursor-default-click-outline" size={30} color="black" />
          </View>
          <Text style={styles.circleText}>Select</Text>
        </View>
        <Text style={styles.arrow}>{'---->'}</Text>
      </View>

      <View style={styles.step}>
        <View style={styles.circleContainer}>
          <View style={styles.circle}>
            <MaterialIcons name="add" size={30} color="black" />
          </View>
          <Text style={styles.circleText}>Add</Text>
        </View>
        <Text style={styles.arrow}>{'---->'}</Text>
      </View>

      <View style={styles.step}>
        <View style={styles.circleContainer}>
          <View style={styles.circle}>
            <Image source={require('../../assets/icon.png')} style={styles.categories} />
          </View>
          <Text style={styles.circleText}>Book</Text>
        </View>
        <Text style={styles.arrow}>{'---->'}</Text>
      </View>

      <View style={styles.step}>
        <View style={styles.circleContainer}>
          <View style={styles.circle}>
            <Image source={require('../../assets/icon.png')} style={styles.categories} />
          </View>
          <Text style={styles.circleText}>Confirm</Text>
        </View>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent:'center'
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.sageGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categories: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.sageGreen,
  },
  circleText: {
    marginTop: 5,
    fontSize: 14,
    color: theme.colors.ivory, // Change color as needed
  },
  arrow: {
    fontSize: 20,
    color: '#ccc',
    marginLeft: 5,
  },
});

export default CircleLogoStepper;
