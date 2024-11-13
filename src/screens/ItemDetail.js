import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import theme from '../core/theme';

const ItemDetail = ({ route, navigation }) => {
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
          // Simulate the item being added to the cart
          Alert.alert("Success!", "Your item has been added to your bucket.");
        } 
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>

      {/* Button to claim the item */}
      <TouchableOpacity
        style={styles.claimButton}
        onPress={handleClaim} // Trigger the confirmation alert
      >
        <Text style={styles.claimButtonText}>Claim Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.charcoalBlack, // Container background color
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: theme.colors.pearlWhite, // Title color
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: theme.colors.pearlWhite, // Description color
    textAlign: 'center',
    marginBottom: 20,
  },
  claimButton: {
    backgroundColor: theme.colors.sageGreen, // Claim button background color
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  claimButtonText: {
    fontSize: 18,
    color: theme.colors.ivory, // Claim button text color
    fontWeight: 'bold',
  },
});

export default ItemDetail;
