import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { theme } from '../core/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CartContext } from '../CartContext';

const foodItems = [
    {
        id: '1',
        images: [
            require('../../assets/items/food1.jpg'),
            require('../../assets/items/D1.jpg'),
            require('../../assets/items/food.jpg'),
        ],
        title: 'Pasta',
        description: 'Delicious and healthy pasta in various sauces.',
    },
    {
        id: '2',
        images: [
          require('../../assets/items/food1.jpg'),
          require('../../assets/items/D1.jpg'),
          require('../../assets/items/food.jpg'),
        ],
        title: 'Salads',
        description: 'Fresh salads with a variety of toppings.',
    },
    {
        id: '3',
        images: [
          require('../../assets/items/food1.jpg'),
          require('../../assets/items/D1.jpg'),
          require('../../assets/items/food.jpg'),
        ],
        title: 'Sandwiches',
        description: 'Tasty sandwiches for a quick bite.',
    },
    {
        id: '4',
        images: [
          require('../../assets/items/food1.jpg'),
          require('../../assets/items/D1.jpg'),
          require('../../assets/items/food.jpg'),
        ],
        title: 'Desserts',
        description: 'Sweet and delicious desserts for everyone.',
    },
];

const Food = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { isInCart } = useContext(CartContext);

    // Filter out items that are already in the cart
    const visibleItems = foodItems.filter(item => !isInCart(item));

    const renderItem = ({ item }) => (
        <View style={styles.donationItem}>
            {/* Display the first image */}
            <Image source={item.images[0]} style={styles.itemImage} />
            <Text style={styles.item}>{item.title}</Text>
            <TouchableOpacity
                style={styles.claimButton}
                onPress={() => navigation.navigate('ItemDetail', { item })}
            >
                <Text style={styles.claimButtonText}>Claim</Text>
            </TouchableOpacity>
        </View>
    );

    // Check if the current route name is "Food"
    const isFoodPage = route.name === 'Food';

    return (
        <View style={styles.container}>
            <FlatList
                data={visibleItems}
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
                                    color={theme.colors.sageGreen}
                                    style={styles.icon}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Food')}>
                                <Icon
                                    name="local-dining"
                                    size={40}
                                    color={isFoodPage ? theme.colors.ivory : theme.colors.sageGreen}
                                    style={[styles.icon, isFoodPage && styles.activeIcon]}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.header}>
                            <Text style={styles.title}>Food Donations</Text>
                        </View>
                    </>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.charcoalBlack,
    },
    header: {
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
        padding: 10,
    },
    donationItem: {
        backgroundColor: 'rgba(72, 72, 72, 0.8)',
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
        color: theme.colors.ivory,
        textAlign: 'center',
        marginBottom: 10,
    },
    claimButton: {
        backgroundColor: theme.colors.charcoalBlack,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: theme.colors.sageGreen,
        borderBottomWidth: 8,
        borderWidth: 3,
        borderRadius: 20,
        marginTop: 10,
    },
    claimButtonText: {
        fontSize: 18,
        color: theme.colors.ivory,
        fontWeight: 'bold',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
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
        backgroundColor: theme.colors.sageGreen,
        padding: 12,
    },
});

export default Food;
