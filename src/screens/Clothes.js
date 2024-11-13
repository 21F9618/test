import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import theme from '../core/theme';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute to check active page
import Icon from 'react-native-vector-icons/MaterialIcons';

const clothesItems = [
    {
        id: '1',
        image: require('../../assets/items/cloth1.jpg'),
        title: 'Winter Jackets',
        description: 'Warm jackets for cold weather, available in various sizes.',
    },
    {
        id: '2',
        image: require('../../assets/items/cloth1.jpg'),
        title: 'T-Shirts',
        description: 'Comfortable cotton t-shirts in different colors and sizes.',
    },
    {
        id: '3',
        image: require('../../assets/items/cloth1.jpg'),
        title: 'Shoes',
        description: 'Durable shoes suitable for all occasions.',
    },
];

const Clothes = () => {
    const navigation = useNavigation();
    const route = useRoute(); // Get current route to identify the active screen

    const renderItem = ({ item }) => (
        <View style={styles.donationItem}>
            <Image source={item.image} style={styles.itemImage} />
            <Text style={styles.item}>{item.title}</Text>
            <TouchableOpacity
                style={styles.claimButton}
                onPress={() => navigation.navigate('ItemDetail', { item })} // Navigate to ItemDetail
            >
                <Text style={styles.claimButtonText}>Claim</Text>
            </TouchableOpacity>
        </View>
    );

    const isClothingPage = route.name === 'Clothes'; // Check if the current route is 'Clothes'

    return (
        <FlatList
            data={clothesItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.grid}
            ListHeaderComponent={
                <>
                    <View style={styles.iconContainer}>
                 
                        <TouchableOpacity onPress={() => navigation.navigate('Education')}>
                            <Icon
                                name="school"
                                size={40}
                                color={theme.colors.sageGreen}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Clothes')}>
                            <Icon
                                name="checkroom"
                                size={40}
                                color={isClothingPage ? theme.colors.ivory : theme.colors.sageGreen} // Highlight if on Clothing page
                                style={[styles.icon, isClothingPage && styles.activeIcon]} // Apply active style if on Clothing page
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Food')}>
                            <Icon
                                name="local-dining"
                                size={40}
                                color={theme.colors.sageGreen}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        {/* Cart Icon */}
                        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                            <Icon
                                name="shopping-cart"
                                size={40}
                                color={theme.colors.sageGreen}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.title}>Clothes Donations</Text>
                    </View>
                </>
            }
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.charcoalBlack, // Dark background color for the whole page
    },
    header: {
        backgroundColor: theme.colors.charcoalBlack, // Dark background for header
        padding: 28,
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    title: {
        fontSize: 28,
        color: theme.colors.ivory, // White color for title
        fontWeight: 'bold',
    },
    grid: {
        justifyContent: 'space-between',
        marginTop: 10,
        backgroundColor: theme.colors.charcoalBlack,
        padding: 10,
    },
    donationItem: {
        backgroundColor: theme.colors.outerSpace, // Light background for items
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        width: '45%',
        alignItems: 'center',
        marginHorizontal: '2.5%',
        shadowColor: theme.colors.sageGreen,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        borderWidth: 2,
        borderColor: theme.colors.sageGreen,
    },
    itemImage: {
        width: 150,
        height: 150,
        borderRadius: 8,
        borderColor: theme.colors.sageGreen,
        borderWidth: 3,
        marginBottom: 10,
    },
    item: {
        fontSize: 20,
        color: theme.colors.ivory, // Dark text color for item title
        textAlign: 'center',
        marginBottom: 10,
    },
    itemDescription: {
        fontSize: 16,
        color: theme.colors.charcoalBlack, // Dark text for description
        textAlign: 'center',
        marginBottom: 15,
    },
    claimButton: {
        backgroundColor: theme.colors.charcoalBlack,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderBottomWidth: 8,
        borderWidth: 3,
        borderColor: theme.colors.sageGreen,
        marginTop: 10,
    },
    claimButtonText: {
        fontSize: 18,
        color: theme.colors.ivory, // White text for claim button
        fontWeight: 'bold',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center', // Center icons with minimal spacing
        paddingVertical: 7,
        backgroundColor: theme.colors.charcoalBlack,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.sageGreen,
    },
    icon: {
        backgroundColor: theme.colors.outerSpace,
        padding: 10,
        borderRadius: 25,
        marginHorizontal: 5,
    },
    activeIcon: {
        backgroundColor: theme.colors.sageGreen, // Change background for active icon
        padding: 12, // Increase padding for highlighted effect
    },
});

export default Clothes;
