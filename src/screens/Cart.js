import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { theme } from '../core/theme';
import { useCart } from '../CartContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import i18n, { t } from '../i18n';

const Cart = ({ route }) => {
  const { cartItems, removeFromCart } = useCart();
  const navigation = useNavigation();
  const { role } = route.params;
  const isUrdu = i18n.locale === "ur";

  const renderItem = ({ item }) => {
    let title = '';
    let description = '';
    let category = '';
    let quantity = item.quantity ? item.quantity.toString() : '1';

    switch (item.category) {
      case "Food":
        title = item.foodName || '';
        description = item.description || '';
        category = t("titles.food", "Food");
        break;
      case "Clothes":
        if (item.itemCategory === "Shoes") {
          title = t(`clothes.item_category_options.${item.itemCategory}`, { defaultValue: item.itemCategory });
        } else {
          title = t(`clothes.clothes_category_options.${item.clothesCategory}`, { defaultValue: item.clothesCategory });
        }
        description = item.description || '';
        category = t("titles.clothes", "Clothes");
        break;
      case "Education":
        title = item.itemName || '';
        description = item.description || '';
        category = t("titles.education", "Education");
        break;
      default:
        title = item.itemName || item.title || '';
        description = item.description || '';
        category = item.category || '';
    }

    return (
      <View style={[styles.itemRow, isUrdu && styles.rtlContainer]}>
        <Image source={item.images[0]} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={[styles.title, isUrdu && styles.urduText]}>{title}</Text>
          <Text style={[styles.description, isUrdu && styles.urduText]}>{description}</Text>
          <Text style={[styles.description, isUrdu && styles.urduText]}>{category}</Text>
          <Text style={[styles.quantity, isUrdu && styles.urduText]}>
            {t("itemDetail.quantity", "Quantity")}: {quantity}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromCart(item)}
        >
          <Text style={[styles.removeButtonText, isUrdu && styles.urduText]}>
            {t("general.remove", "Remove")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, isUrdu && styles.rtlContainer]}>
      {/* Updated fixed icon header */}
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Education')} style={styles.iconWrapper}>
          <Icon name="school" size={30} color={theme.colors.charcoalBlack} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Clothes')} style={styles.iconWrapper}>
          <Icon name="checkroom" size={30} color={theme.colors.charcoalBlack} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Food')} style={styles.iconWrapper}>
          <Icon name="local-dining" size={30} color={theme.colors.charcoalBlack} />
        </TouchableOpacity>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={[styles.noItemText, isUrdu && styles.urduText]}>
            {t("cart.emptyCart", "Your cart is empty.")}
          </Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.charcoalBlack,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  rtlContainer: {
    direction: 'rtl',
  },
  list: {
    paddingBottom: 30,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
    marginHorizontal: 20,
  },
  iconWrapper: {
    backgroundColor: theme.colors.sageGreen,
    padding: 16,
    borderRadius: 30,
    elevation: 5,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.outerSpace,
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 14,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    color: theme.colors.sageGreen,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: theme.colors.ivory,
    marginBottom: 2,
  },
  quantity: {
    fontSize: 14,
    color: theme.colors.TaupeBlack,
    fontWeight: '600',
    marginTop: 4,
  },
  removeButton: {
    backgroundColor: theme.colors.sageGreen,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  removeButtonText: {
    fontSize: 14,
    color: theme.colors.charcoalBlack,
    fontWeight: 'bold',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  noItemText: {
    color: theme.colors.ivory,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 28,
    paddingHorizontal: 20,
  },
  urduText: {
    fontSize: 18,
    fontFamily: 'System',
    textAlign: 'right',
  },
});

export default Cart;
