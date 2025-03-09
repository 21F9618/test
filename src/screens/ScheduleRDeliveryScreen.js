import React, { useState, useEffect } from "react";
import { useRoute } from '@react-navigation/native';
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import CalendarPicker from "react-native-calendar-picker";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from "react-native";
import { theme } from "../core/theme";
import Button from "../components/Button";
import MapPicker from "../components/MapPicker";
import TextInput from "../components/TextInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from 'axios';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { getBaseUrl } from "../helpers/deviceDetection"


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
        } catch (error) {
            console.error("Error fetching claimer's address:", error);
            setClaimerAddress(""); // Handle errors gracefully
        }
    };

    fetchClaimerAddress();
}, [claimerUsername]); // Runs when claimerUsername changes


  const getAddressFromCoordinates = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'dast-e-khair/1.0 (zhalaym@gmaile.com)',
        },
      });

      const fetchedAddress = response.data.display_name;
      const filteredAddress = fetchedAddress
        .replace(/[^a-zA-Z0-9,.-]/g, '')
        .replace(/\s+/g, '')
        .replace(/,+/g, ',')
        .replace(/^,|,$/g, '');

      console.log("Filtered Address:", filteredAddress);
      return filteredAddress;
    } catch (error) {
      setError('Error fetching address');
      console.error("Error fetching address:", error.message || error);
      return 'Unknown Address';
    }
  };

  const onDateChange = (date) => setSelectedStartDate(date);

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) setPickupTime(selectedTime);
  };

  const handleLocationSelect = async (location, type) => {
    const address = await getAddressFromCoordinates(location.latitude, location.longitude);

    if (type === 'pickup') {
      setPickupLocation(address);
      setPickupCoordinates({ latitude: location.latitude, longitude: location.longitude });
    } else if (type === 'dropoff') {
      setDropOffLocation(address);
      setDropOffCoordinates({ latitude: location.latitude, longitude: location.longitude });
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

    try {
      // Here you would save the delivery details to your backend
      // const BASE_URL = await getBaseUrl();
      // const endpoint = `${BASE_URL}/api/schedule-delivery`;
      // await axios.post(endpoint, {
      //   claimedItemId: id,
      //   pickupDate: selectedStartDate,
      //   pickupTime: pickupTime,
      //   pickupLocation,
      //   pickupCoordinates,
      //   dropOffLocation,
      //   dropOffCoordinates
      // });

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
                <Text style={styles.header}>Schedule Delivery</Text>
                <Text style={styles.itemTitle}>{claimedItem.name || 'Item'}</Text>
                {claimedItem.description && (
                  <Text style={styles.itemDescription}>{claimedItem.description}</Text>
                )}
                {claimedItem.quantity && (
                  <Text style={styles.itemQuantity}>Quantity: {claimedItem.quantity}</Text>
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
              onChangeText={(text) => setPickupLocation(text)}
            />
            <Button
              mode="contained"
              onPress={() => setIsPickupMapVisible(true)}
              style={styles.button}
              icon="map-marker"
            >
              Select on Map
            </Button>

            <Text style={styles.sectionTitle}>Drop-off Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Drop-Off Location"
              placeholderTextColor={theme.colors.placeholder}
              value={dropOffLocation}
              onChangeText={(text) => setDropOffLocation(text)}
            />
            <Button
              mode="contained"
              onPress={() => setIsDropoffMapVisible(true)}
              style={styles.button}
              icon="map-marker"
            >
              Select on Map
            </Button>

            {/* Save Button */}
            <Button
              mode="contained"
              onPress={handleSaveDelivery}
              style={styles.saveButton}
              disabled={!selectedStartDate || !pickupLocation || !dropOffLocation}
            >
              Schedule Delivery
            </Button>
          </>
        )}
      </ScrollView>

      {/* Map Overlays */}
      {isPickupMapVisible && (
        <View style={styles.mapOverlay}>
          <MapPicker
            onLocationSelect={(location) => handleLocationSelect(location, "pickup")}
            onCancel={handleCancel}
          />
        </View>
      )}
      {isDropoffMapVisible && (
        <View style={styles.mapOverlay}>
          <MapPicker
            onLocationSelect={(location) => handleLocationSelect(location, "dropoff")}
            onCancel={handleCancel}
          />
        </View>
      )}
    </Background>
  );
}


const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.ivory,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  calendarContainer: {
    backgroundColor: theme.colors.ivory,
    width: '100%',
    height: '30%',
    alignItems: 'center',
    marginBottom: 5,
    borderWidth: 4,
    borderColor: theme.colors.sageGreen,
    borderRadius: 8,
    padding: 10,
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
    paddingLeft: 5,
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
    bottom: 0,
    left: 0,
    right: 0,
  },
  backButtonWrapper: {
    position: 'absolute',
    top: 5,
    left: 0,
  },
});



