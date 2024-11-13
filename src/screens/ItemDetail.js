import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import theme from '../core/theme';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the FontAwesome icon library

const ItemDetail = ({ route, navigation }) => {
  const { item } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const handleClaim = () => {
    setModalVisible(true); // Show the modal
  };

  const confirmClaim = () => {
    setModalVisible(false); // Close the modal
    setConfirmationVisible(true); // Show success confirmation modal
  };

  const cancelClaim = () => {
    setModalVisible(false); // Close the modal if canceled
  };

  const goToCart = () => {
    // Add navigation logic to cart screen if necessary
    navigation.navigate('Cart'); // Assuming you have a 'Cart' screen
  };

  return (
    <View style={styles.container}>
      {/* Cart Icon at the top-right corner */}
      <TouchableOpacity style={styles.cartIcon} onPress={goToCart}>
        <Icon name="shopping-cart" size={30} color={theme.colors.ivory} />
      </TouchableOpacity>

      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>

      {/* Button to claim the item */}
      <TouchableOpacity
        style={styles.claimButton}
        onPress={handleClaim} // Trigger the custom modal
      >
        <Text style={styles.claimButtonText}>Claim Item</Text>
      </TouchableOpacity>

      {/* Modal for claim confirmation */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={cancelClaim}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Claim</Text>
            <Text style={styles.modalText}>
              Are you sure you want to claim this item? It will be added to your bucket.
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={cancelClaim}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmClaim}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success confirmation modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={confirmationVisible}
        onRequestClose={() => setConfirmationVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.successModalContainer}>
            <Text style={styles.successTitle}>Claim Successful!</Text>
            <Text style={styles.successText}>
              The item has been added to your bucket.
            </Text>

            <TouchableOpacity
              style={styles.successButton}
              onPress={() => setConfirmationVisible(false)} // Close the success modal
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  cartIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  image: {
    width: 250,
    height: 250,
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
    marginBottom: 20,
  },
  claimButton: {
    backgroundColor: theme.colors.sageGreen,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  claimButtonText: {
    fontSize: 18,
    color: theme.colors.ivory,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    backgroundColor: theme.colors.outerSpace,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 300,
  },
  modalTitle: {
    fontSize: 22,
    color: theme.colors.ivory,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 18,
    color: theme.colors.pearlWhite,
    marginBottom: 25,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '45%',
  },
  cancelButton: {
    backgroundColor: theme.colors.charcoalBlack,
    borderWidth: 2,
    borderColor: theme.colors.sageGreen,
  },
  confirmButton: {
    backgroundColor: theme.colors.sageGreen,
  },
  modalButtonText: {
    fontSize: 18,
    color: theme.colors.ivory,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  successModalContainer: {
    backgroundColor: theme.colors.outerSpace,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 300,
  },
  successTitle: {
    fontSize: 22,
    color: theme.colors.ivory,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  successText: {
    fontSize: 18,
    color: theme.colors.pearlWhite,
    marginBottom: 25,
    textAlign: 'center',
  },
  successButton: {
    backgroundColor: theme.colors.sageGreen,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
});

export default ItemDetail;
