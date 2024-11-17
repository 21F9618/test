import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import theme from '../core/theme';

const Cart = ({ route }) => {
  const { claimedItem } = route.params; // Get the claimed item passed from ItemDetail.js

  return (
    <View style={styles.container}>
      {claimedItem ? (
        <View style={styles.itemContainer}>
          <Image source={claimedItem.image} style={styles.image} />
          <Text style={styles.title}>{claimedItem.title}</Text>
          <Text style={styles.description}>{claimedItem.description}</Text>
        </View>
      ) : (
        <Text style={styles.noItemText}>No items in your cart.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.charcoalBlack,
    padding: 20,
    alignItems: 'center',
  },
  itemContainer: {
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
    color: theme.colors.pearlWhite,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: theme.colors.pearlWhite,
    textAlign: 'center',
  },
  noItemText: {
    fontSize: 18,
    color: theme.colors.pearlWhite,
  },
});

export default Cart;
