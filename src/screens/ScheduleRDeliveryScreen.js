import React, { useState, useEffect } from "react";
import { useRoute } from '@react-navigation/native';
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from "react-native";
import { theme } from "../core/theme";
import Button from "../components/Button";
import MapPicker from "../components/MapPicker";
import TextInput from "../components/TextInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { getBaseUrl } from "../helpers/deviceDetection"
import CalendarPicker from "react-native-calendar-picker";
import axios from 'axios';


const GOOGLE_API_KEY = "AIzaSyB9irjntPHdEJf024h7H_XKpS11OeW1Nh8";

export default function ScheduleRDeliveryScreen({ navigation }) {
  const route = useRoute();
  const { id = 6 } = route.params || {};

  // State for claimed item data
  const [claimedItem, setClaimedItem] = useState(null);
  const [donorUsername, setDonorUsername] = useState("");
  const [claimerUsername, setClaimerUsername] = useState("");
  const [donationType, setDonationType] = useState("");
  const [loading, setLoading] = useState(true);
  const [claimerAddress, setClaimerAddress] = useState("");

  // Delivery details state
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [error, setError] = useState(null);
  const [pickupTime, setPickupTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [pickupCoordinates, setPickupCoordinates] = useState(null);
  const [dropOffCoordinates, setDropOffCoordinates] = useState(null);

  // Map visibility state
  const [isPickupMapVisible, setIsPickupMapVisible] = useState(false);
  const [isDropoffMapVisible, setIsDropoffMapVisible] = useState(false);

  // Fetch the specific claimed item based on ID
  useEffect(() => {
    fetchClaimedItem();
  }, [id]);

  const fetchClaimedItem = async () => {
    if (!id) {
      setError("No item ID provided");
      setLoading(false);
      return;
    }

    try {
      const BASE_URL = await getBaseUrl();
      const endpoint = `${BASE_URL}/api/claimed-items`;
      const response = await axios.get(endpoint);

      console.log("Fetched Claimed Items:", response.data); // Debugging step

      // Ensure response.data.data exists and is an array before using find()
      if (Array.isArray(response.data?.data)) {
        const matchingItem = response.data.data.find(item => item.id === id);

        if (matchingItem) {
          console.log("Found matching claimed item:", matchingItem);
          setClaimedItem(matchingItem);
          // Update state variables
          setClaimedItem(matchingItem);
          setDonorUsername(matchingItem.donorUsername);
          setClaimerUsername(matchingItem.claimerUsername);
          setDonationType(matchingItem.donationType);

          // Log extracted values
          console.log("Donor Username:", matchingItem.donorUsername);
          console.log("Claimer Username:", matchingItem.claimerUsername);
          console.log("Donation Type:", matchingItem.donationType);

        } else {
          console.log("No matching item found for ID:", id);
          setError("Item not found");
        }
      } else {
        console.error("Unexpected API response format:", response.data);
        setError("Unexpected response format");
      }
    } catch (error) {
      console.error("Error fetching claimed item:", error);
      setError("Failed to load item details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!claimerUsername) return; // Prevent running when username is empty

    const fetchClaimerAddress = async () => {
        try {
            // Step 1: Get the UID of the claimerUsername
            const userQuery = await firestore()
                .collection("recipients") // Collection where user details are stored
                .where("username", "==", claimerUsername)
                .get();

            if (userQuery.empty) {
                console.warn("No user found with username:", claimerUsername);
                setClaimerAddress(""); // Clear address if user not found
                return;
            }

            const uid = userQuery.docs[0].id; // Extract UID
            console.log("Found UID for claimer:", uid);

            // Step 2: Fetch address from IndividualProfile collection using UID
            const profileDoc = await firestore()
                .collection("individual_profiles")
                .doc(uid)
                .get();

            if (!profileDoc.exists) {
                console.warn("No profile found for UID:", uid);
                setClaimerAddress(""); // Clear address if profile not found
                return;
            }

            const address = profileDoc.data().address; // Extract address
            console.log("Claimer's Address:", address);

            setClaimerAddress(address); // Update state with fetched address
            
            // Set the claimer's address as the drop-off location
            setDropOffLocation(address);
            
            // Get coordinates for the claimer's address
            validateAndGetCoordinates(address, 'dropoff');
        } catch (error) {
            console.error("Error fetching claimer's address:", error);
            setClaimerAddress(""); // Handle errors gracefully
        }
    };

    fetchClaimerAddress();
  }, [claimerUsername]); // Runs when claimerUsername changes

  // Validate address and get coordinates using Google Maps API
  const validateAndGetCoordinates = async (address, locationType) => {
    console.log("in validateAndGetCoordinates");
    if (!address) return;
    
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`
      );
      
      if (response.data.status === 'OK' && response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        const coordinates = {
          latitude: location.lat,
          longitude: location.lng
        };
        
        // Format the address
        const formattedAddress = response.data.results[0].formatted_address;
        
        if (locationType === 'pickup') {
          setPickupCoordinates(coordinates);
          setPickupLocation(formattedAddress);
        } else if (locationType === 'dropoff') {
          setDropOffCoordinates(coordinates);
          setDropOffLocation(formattedAddress);
        }
        
        return coordinates;
      } else {
        console.error("Address validation failed:", response.data.status);
        Alert.alert('Invalid Address', 'Please enter a valid address');
        return null;
      }
    } catch (error) {
      console.error("Error validating address:", error);
      Alert.alert('Error', 'Failed to validate address');
      return null;
    }
  };

  const onDateChange = (date) => setSelectedStartDate(date);

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) setPickupTime(selectedTime);
  };

  const handleLocationSelect = async (location, type) => {
    // Get address from Google Maps API using reverse geocoding
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${GOOGLE_API_KEY}`
      );
      
      if (response.data.status === 'OK' && response.data.results.length > 0) {
        const address = response.data.results[0].formatted_address;
        
        if (type === 'pickup') {
          setPickupLocation(address);
          setPickupCoordinates({ latitude: location.latitude, longitude: location.longitude });
        } else if (type === 'dropoff') {
          setDropOffLocation(address);
          setDropOffCoordinates({ latitude: location.latitude, longitude: location.longitude });
        }
      } else {
        console.error("Reverse geocoding failed:", response.data.status);
        Alert.alert('Error', 'Failed to get address from location');
      }
    } catch (error) {
      console.error("Error in reverse geocoding:", error);
      Alert.alert('Error', 'Failed to get address from location');
    }

    // Hide the map after selection
    setIsPickupMapVisible(false);
    setIsDropoffMapVisible(false);
  };

  const handleCancel = () => {
    setIsPickupMapVisible(false);
    setIsDropoffMapVisible(false);
  };

  const handleSaveDelivery = async () => {
    if (!selectedStartDate) {
      Alert.alert('Error', 'Please select a pickup date');
      return;
    }

    if (!pickupLocation) {
      Alert.alert('Error', 'Please enter a pickup location');
      return;
    }

    if (!dropOffLocation) {
      Alert.alert('Error', 'Please enter a drop-off location');
      return;
    }

    // Validate addresses if they were manually entered
    if (!pickupCoordinates) {
      const coords = await validateAndGetCoordinates(pickupLocation, 'pickup');
      if (!coords) return;
    }

    if (!dropOffCoordinates) {
      const coords = await validateAndGetCoordinates(dropOffLocation, 'dropoff');
      if (!coords) return;
    }

    try {
      // Save the order to Firebase
      await firestore()
        .collection('orders')
        .doc(id.toString()) // Use the claimed item ID as the order ID
        .set({
          orderId: id,
          origin: {
            latitude: pickupCoordinates.latitude,
            longitude: pickupCoordinates.longitude,
            address: pickupLocation
          },
          destination: {
            latitude: dropOffCoordinates.latitude,
            longitude: dropOffCoordinates.longitude,
            address: dropOffLocation
          },
          pickupDate: selectedStartDate.toISOString(),
          pickupTime: pickupTime.toISOString(),
          status: 'pending',
          createdAt: firestore.FieldValue.serverTimestamp()
        });

      // Show success alert
      Alert.alert(
        'Delivery Scheduled',
        'Your delivery has been successfully scheduled!',
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('Delivery scheduled for item ID:', id);
              navigation.goBack(); // Navigate back after scheduling
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error scheduling delivery:", error);
      Alert.alert('Error', 'Failed to schedule delivery. Please try again.');
    }
  };

  // Handle address input change and validation
  const handleAddressChange = (text, type) => {
    if (type === 'pickup') {
      setPickupLocation(text);
      // Clear coordinates when manually editing
      setPickupCoordinates(null);
    } else if (type === 'dropoff') {
      setDropOffLocation(text);
      // Clear coordinates when manually editing
      setDropOffCoordinates(null);
    }
  };

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <Text style={styles.loadingText}>Loading item details...</Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
            {/* Item Details Section */}
            {claimedItem && (
              <View style={styles.itemDetailsContainer}>
                <Text style={styles.itemTitle}>{claimedItem.itemName || 'Item'}</Text>
                {claimedItem.claimerUsername && (
                  <Text style={styles.itemDescription}>Claimed by: {claimedItem.claimerUsername}</Text>
                )}
                {claimedItem.itemId&& (
                  <Text style={styles.itemQuantity}>Item id:{claimedItem.itemId}</Text>
                )}
              </View>
            )}

            {/* Calendar Section */}
            <Text style={styles.sectionTitle}>Select Pickup Date</Text>
            <View style={styles.calendarContainer}>
              <CalendarPicker
                onDateChange={onDateChange}
                textStyle={styles.calendarText}
                todayBackgroundColor={theme.colors.sageGreen}
                selectedDayColor={theme.colors.sageGreen}
                selectedDayTextColor="white"
                width={300}
                minDate={new Date()}
                style={styles.calendar}
              />
            </View>

            {selectedStartDate && (
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>
                  Pickup Date: {selectedStartDate.toDateString()}
                </Text>
              </View>
            )}

            {/* Time Picker Section */}
            <Text style={styles.sectionTitle}>Select Pickup Time</Text>
            <Button
              mode="contained"
              onPress={() => setShowTimePicker(true)}
              style={styles.button}
            >
              {pickupTime ? pickupTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Set Pickup Time'}
            </Button>

            {showTimePicker && (
              <DateTimePicker
                value={pickupTime}
                mode="time"
                display="spinner"
                onChange={onTimeChange}
                themeVariant="dark"
                accentColor={theme.colors.sageGreen}
              />
            )}

            {/* Location Section */}
            <Text style={styles.sectionTitle}>Pickup Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Pickup Location"
              placeholderTextColor={theme.colors.placeholder}
              value={pickupLocation}
              onChangeText={(text) => handleAddressChange(text, 'pickup')}
            />
            <View style={styles.buttonRow}>
              <Button
                mode="contained"
                onPress={() => setIsPickupMapVisible(true)}
                style={[styles.button, styles.rowButton]}
                icon="map-marker"
              >
                Select on Map
              </Button>
              <Button
                mode="contained"
                onPress={() => validateAndGetCoordinates(pickupLocation, 'pickup')}
                style={[styles.button, styles.rowButton]}
              >
                 Validate Address
              </Button>
            </View>

            <Text style={styles.sectionTitle}>Drop-off Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Drop-Off Location"
              placeholderTextColor={theme.colors.placeholder}
              value={dropOffLocation}
              onChangeText={(text) => handleAddressChange(text, 'dropoff')}
            />
            <View style={styles.buttonRow}>
              <Button
                mode="contained"
                onPress={() => setIsDropoffMapVisible(true)}
                style={[styles.button, styles.rowButton]}
                icon="map-marker"
              >
                Select on Map
              </Button>
              <Button
                mode="contained"
                onPress={() => validateAndGetCoordinates(dropOffLocation, 'dropoff')}
                style={[styles.button, styles.rowButton]}
              >
                Validate Address
              </Button>

              
            </View>
              {/* Save Button - Enhanced to be more visible */}
              <View style={styles.saveButtonContainer}>
              <Button
                mode="contained"
                onPress={handleSaveDelivery}
                style={styles.saveButton}
                disabled={!selectedStartDate || !pickupLocation || !dropOffLocation}
              >
                Schedule Delivery
              </Button>
            </View>
            {/* Save Button */}

          </>
        )}
      </ScrollView>

      {/* Map Overlays */}
      {isPickupMapVisible && (
        <View style={styles.mapOverlay}>
          <MapPicker
            onLocationSelect={(location) => handleLocationSelect(location, "pickup")}
            onCancel={handleCancel}
            buttonStyle={styles.mapButtons}
          />
        </View>
      )}
      {isDropoffMapVisible && (
        <View style={styles.mapOverlay}>
          <MapPicker
            onLocationSelect={(location) => handleLocationSelect(location, "dropoff")}
            onCancel={handleCancel}
            buttonStyle={styles.mapButtons}
          />
        </View>
      )}
    </Background>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.ivory,
    textAlign: 'center',
    marginBottom: 20,
    marginTop:20,
  },
  calendarContainer: {
    backgroundColor: theme.colors.ivory,
    width: '100%',
    height: '30%',
    alignItems: 'center',
    marginBottom: 1,
    borderWidth: 4,
    borderColor: theme.colors.sageGreen,
    borderRadius: 4,
    padding: 5,
  },
  calendar: {
    width: '100%',
    height: 390,
  },
  calendarText: {
    fontSize: 14, // Change the font size for calendar dates
    color: theme.colors.background,
  },
  dateContainer: {
    marginTop: 20,
    alignItems: "left",
  },
  dateText: {
    fontSize: 18,
    color: theme.colors.ivory,
    textAlign: 'left',
    paddingLeft:5,
  },
  timeButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: theme.colors.sageGreen,
    borderRadius: 5,
  },
  timeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: 'center',
  },
  tabNavigatorPlaceholder: {
    height: 60,
    backgroundColor: theme.colors.sageGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabNavigatorText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    width: "90%",
    height: 25,
    padding: 15,
    borderWidth: 1,
    borderColor: theme.colors.sageGreen,
    borderRadius: 7,
    backgroundColor: theme.colors.ivory,
  },
  mapOverlay: {
    position: "absolute",
    top: 0,
    bottom: 40,
    left: 0,
    right: 0,
  },
  backButtonWrapper: {
    position: 'absolute',
    top: 5, 
    left: 0, 
  },
  // New styles for the button row
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 15,
  },
  rowButton: {
    flex: 0.48, // This makes each button take up slightly less than half the space
  },
  button: {
    marginBottom: 10,
  },
  validateButton: {
    borderColor: theme.colors.sageGreen,
  },
  useAddressButton: {
    borderColor: theme.colors.sageGreen,
  },
  saveButtonContainer: {
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
    bottom: 20,
    marginBottom: 40, // Add more bottom margin to ensure it's visible
  },
  saveButton: {
    width: '100%',
    backgroundColor: theme.colors.sageGreen,
    paddingVertical: 12,
    borderRadius: 8,
    // Add shadow for better visibility
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // Style for map buttons to position them higher
  mapButtons: {
    position: 'absolute',
    bottom: 400, // Moved up from the bottom
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  itemDetailsContainer: {},
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.ivory,
    marginTop: 15,
    marginBottom: 10,
  },
  claimerAddressContainer: {},
  addressText: {
    fontSize: 16,
    color: theme.colors.ivory,
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 18,
    color: theme.colors.ivory,
    textAlign: 'center',
    marginTop: 50,
  },
  errorText: {
    fontSize: 18,
    color: '#ff6b6b',
    textAlign: 'center',
    marginTop: 50,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.ivory,
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 16,
    color: theme.colors.ivory,
    marginBottom: 8,
  },
  itemQuantity: {
    fontSize: 16,
    color: theme.colors.ivory,
    fontWeight: '500',
  },
});