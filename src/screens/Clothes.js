// src/screens/Clothes.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import theme from '../core/theme';
import { useNavigation } from '@react-navigation/native';

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

    const renderItem = ({ item }) => (
        <View style={styles.donationItem}>
            <Image source={item.image} style={styles.itemImage} />
            <Text style={styles.item}>{item.title}</Text>
            {/* <Text style={styles.itemDescription}>{item.description}</Text> */}
            <TouchableOpacity
                style={styles.claimButton}
                onPress={() => navigation.navigate('ItemDetail', { item })} // Navigate to ItemDetail
            >
                <Text style={styles.claimButtonText}>Claim</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <FlatList
            data={clothesItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.grid}
            ListHeaderComponent={
                <View style={styles.header}>
                    <Text style={styles.title}>Clothes Donations</Text>
                </View>
            }
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.charcoalBlack,
    },
    header: {
        backgroundColor: theme.colors.outerSpace,
        padding: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    title: {
        fontSize: 28,
        color: theme.colors.ivory,
        fontWeight: 'bold',
    },
    grid: {
        justifyContent: 'space-between',
        marginTop: 10,
    },
    donationItem: {
        backgroundColor: theme.colors.outerSpace,
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        width: '45%',
        alignItems: 'center',
        marginHorizontal: '2.5%',
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
        color: theme.colors.pearlWhite,
        textAlign: 'center',
        marginBottom: 10,
    },
    itemDescription: {
        fontSize: 16,
        color: theme.colors.pearlWhite,
        textAlign: 'center',
        marginBottom: 15,
    },
    claimButton: {
        backgroundColor: theme.colors.sageGreen,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 10,
    },
    claimButtonText: {
        fontSize: 18,
        color: theme.colors.ivory,
        fontWeight: 'bold',
    },
});

export default Clothes;
