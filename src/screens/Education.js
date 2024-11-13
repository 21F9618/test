// src/screens/Education.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import theme from '../core/theme';
import { useNavigation } from '@react-navigation/native';

const educationItems = [
    {
        id: '1',
        image: require('../../assets/items/STATIONARY.jpg'),
        title: 'Books',
        description: 'A variety of educational books for all age groups.',
    },
    {
        id: '2',
        image: require('../../assets/items/STATIONARY.jpg'),
        title: 'Stationery',
        description: 'Pens, notebooks, and other stationery supplies.',
    },
    {
        id: '3',
        image: require('../../assets/items/STATIONARY.jpg'),
        title: 'Online Courses',
        description: 'Free and discounted online courses for skill development.',
    },
];

const Education = () => {
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
            data={educationItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.grid}
            ListHeaderComponent={
                <View style={styles.header}>
                    <Text style={styles.title}>Education Donations</Text>
                </View>
            }
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.charcoalBlack, // Dark background color
    },
    header: {
        backgroundColor: theme.colors.charcoalBlack, // Dark background for header
        padding: 20,
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
    },
    donationItem: {
        backgroundColor: theme.colors.charcoalBlack, // Dark background for items
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
        color: theme.colors.pearlWhite, // Light text for items
        textAlign: 'center',
        marginBottom: 10,
    },
    itemDescription: {
        fontSize: 16,
        color: theme.colors.pearlWhite, // Light text for description
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
        color: theme.colors.ivory, // White text for claim button
        fontWeight: 'bold',
    },
});

export default Education;
