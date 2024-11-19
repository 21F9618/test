import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import theme from '../core/theme';
import { useCart } from '../CartContext';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noItemText}>Your cart is empty.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromCart(item.id)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.charcoalBlack,
    padding: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: theme.colors.outerSpace,
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    color: theme.colors.pearlWhite,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: theme.colors.pearlWhite,
    marginTop: 5,
  },
  removeButton: {
    backgroundColor: theme.colors.sageGreen,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    fontSize: 14,
    color: theme.colors.charcoalBlack,
    fontWeight: 'bold',
  },
  noItemText: {
    fontSize: 18,
    color: theme.colors.pearlWhite,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default Cart;
