import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import theme from '../core/theme';

const DonationDetails = ({ route, navigation, addItemToCart }) => {
  const { item } = route.params;

  const handleClaim = () => {
    Alert.alert("Are you sure?", "Do you want to claim this item?", [
      { 
        text: "No", 
        style: "cancel" 
      },
      { 
        text: "Yes", 
        onPress: () => {
          addItemToCart(item); // Add item to the cart
          alert("Item added to your cart!");
        } 
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity style={styles.claimButton} onPress={handleClaim}>
        <Text style={styles.claimButtonText}>Claim</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.charcoalBlack || '#333333', // Fallback to #333333
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: theme.colors.pearlWhite || '#F5F5F5', // Fallback to #F5F5F5
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: theme.colors.pearlWhite || '#F5F5F5', // Fallback to #F5F5F5
    textAlign: 'center',
    marginBottom: 20,
  },
  claimButton: {
    backgroundColor: theme.colors.sageGreen || '#9CAF88', // Fallback to #9CAF88
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  claimButtonText: {
    fontSize: 18,
    color: theme.colors.ivory || '#FFFFFF', // Fallback to #FFFFFF
    fontWeight: 'bold',
  },
});

export default DonationDetails;
