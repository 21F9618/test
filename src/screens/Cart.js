import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import theme from '../core/theme';
import { useNavigation, useRoute } from '@react-navigation/native';

const Cart = () => {
    const navigation = useNavigation();
    const route = useRoute();

    // Initialize with an empty cart
    const [cartItems, setCartItems] = useState([]);

    // Effect to listen for new claimed items
    useEffect(() => {
        if (route.params?.newItem) {
            // Add the new item to the cart
            setCartItems((prevItems) => [...prevItems, route.params.newItem]);
        }
    }, [route.params?.newItem]);
    

    // Remove item from the cart
    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    // Render each cart item
    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.id)}
            >
                <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.cartList}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Your cart is empty!</Text>
                    </View>
                }
            />
            <View style={styles.checkoutContainer}>
                <TouchableOpacity
                    style={styles.checkoutButton}
                    onPress={() => navigation.navigate('Checkout')}
                >
                    <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.charcoalBlack,
        padding: 20,
    },
    cartList: {
        flexGrow: 1,
        marginBottom: 20,
    },
    cartItem: {
        backgroundColor: theme.colors.outerSpace,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 15,
        marginBottom: 15,
        elevation: 8,
        shadowColor: theme.colors.sageGreen,
        shadowOpacity: 0.15,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 20,
    },
    itemInfo: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 18,
        color: theme.colors.ivory,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    itemDescription: {
        fontSize: 14,
        color: theme.colors.ivory,
    },
    removeButton: {
        backgroundColor: theme.colors.sageGreen,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    removeButtonText: {
        color: theme.colors.ivory,
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkoutContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    checkoutButton: {
        backgroundColor: theme.colors.sageGreen,
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: theme.colors.ivory,
        width: '80%',
        alignItems: 'center',
        shadowColor: theme.colors.sageGreen,
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },
    checkoutButtonText: {
        fontSize: 20,
        color: theme.colors.ivory,
        fontWeight: 'bold',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    emptyText: {
        fontSize: 22,
        color: theme.colors.ivory,
        fontWeight: 'bold',
    },
});

export default Cart;
