import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Menu } from "react-native-paper";
import Entypo from 'react-native-vector-icons/Entypo';
import { Dimensions } from "react-native";
import MapViewDirections from 'react-native-maps-directions';
import { theme } from "../core/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import NewOrderPopup from "../components/NewOrderPopup";
import FontAwesome from "react-native-vector-icons/FontAwesome";



const origin = { latitude: 28.450927, longitude: -16.260845 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyDFhFUaYpyAjNE4Eq-sWCGWjrr6kyGnhbQ'

const RiderHomeScreen = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [myPosition, setMyPosition] = useState(null);
  const [order, setOrder] = useState(null);
  const [newOrder, setNewOrder] = useState({
    id: '1',
    type: 'LULU',

    originLatitude: 28.453327,
    originLongitude: -16.263045,

    destLatitude: 28.452927,
    destLongitude: -16.260845,

    user: {
      rating: 3.8,
      name: 'gunhands',
    }
  })


  const [routeData, setRouteData] = useState({
    origin: { latitude: 28.453327, longitude: -16.263045 },
    destination: { latitude: 28.452927, longitude: -16.260845 },
    polyline: [],
    distance: null,
    duration: null,
  });




  const onGoPress = () => {
    setIsOnline(!isOnline);
  }

  const onDecline = () => {
    setNewOrder(null);
  }

  const onAccept = (newOrder) => {
    setOrder(newOrder);
    setNewOrder(null);

  }

  const renderBottomTitle = () => {

    if (order) {
      return (
        <View style={{ alignItems: 'center' }}>
          <View style={styles.lm1}>
            <Text>1 min</Text>
            <View style={styles.lm2}>
              <FontAwesome name={"user"} color={"white"} size={35} />
            </View>
            <Text>0.33 mi</Text>
          </View>
          <Text style={styles.bottomText}>On the way to {order.user.name}</Text>

        </View>

      )
    }
    if (isOnline) {
      return (
        <Text style={styles.bottomText}>You're Online</Text>
      )
    }
  }



  // Fetch directions and decode polyline
  const getDirections = async () => {
    const apiKey = 'AlzaSycxnGQ4K4aaOSQNVly04YVWl3EwpLSUG5C';
    const origin = `${routeData.origin.latitude},${routeData.origin.longitude}`;
    const destination = `${routeData.destination.latitude},${routeData.destination.longitude}`;
    const url = `https://maps.gomaps.pro/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("in the directions");

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const points = decodePolyline(route.overview_polyline.points);
        const leg = route.legs[0];

        setRouteData({
          ...routeData,
          polyline: points,
          distance: leg.distance.text,
          duration: leg.duration.text,
        });

      } else {
        alert('No route found!');
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
      alert('Failed to fetch directions!');
    }
  };

  // Function to reverse geocode using the GoMaps API
  const getAddressFromCoordinates = async (latitude, longitude) => {
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AlzaSycxnGQ4K4aaOSQNVly04YVWl3EwpLSUG5C`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        const address = data.results[0].formatted_address; // Get the formatted address
        return address; // Return the address
      } else {
        console.error("Geocoding failed:", data.status);
        return null; // If no address found
      }
    } catch (error) {
      console.error('Error in reverse geocoding:', error);
      return null;
    }
  };


  // Function to decode polyline data
  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0, lat = 0, lng = 0;

    while (index < encoded.length) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = (result & 1) !== 0 ? ~(result >> 1) : (result >> 1);
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = (result & 1) !== 0 ? ~(result >> 1) : (result >> 1);
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }

    return points;
  };

  // Call getDirections when an order is accepted
  useEffect(() => {
    if (order) {
      getDirections();
    }
  }, [order]);


  // Function to get distance and duration from Distance Matrix API
  const getDistanceAndDuration = async (origin, destination) => {
    console.log("In getDistanceAndDuration, Origin:", origin);
    console.log("In getDistanceAndDuration, Destination:", destination);

    const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=${destination}&origins=${origin}&key=AlzaSycxnGQ4K4aaOSQNVly04YVWl3EwpLSUG5C`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log("Full JSON Response:", data); // Log the full response
      console.log("Rows Array:", data.rows); // Log the rows array
      console.log("Elements Array in Rows:", data.rows[0].elements); // Log the elements array

      const elements = data.rows[0].elements;

      if (elements[0].status === "OK") {
        const distance = elements[0].distance.text; // Access the distance text
        const duration = elements[0].duration.text; // Access the duration text

        // Log the extracted values for confirmation
        console.log("Extracted Distance:", distance);
        console.log("Extracted Duration:", duration);
       
        return { distance, duration };
      } else {
        console.error("Invalid status in elements:", elements[0]);
        alert("No data found for the given origin and destination!");
      }
    } catch (error) {
      console.error("Error fetching distance and duration:", error);
      alert("Failed to fetch distance and duration!");
    }

  };

  useEffect(() => {
    console.log("routeData updated:", routeData);
  }, [routeData]);


  useEffect(() => {
    if (order && routeData) {
      const { origin, destination } = routeData;

      // Function to fetch addresses and calculate distance and duration
      const fetchAddressesAndCalculateDistance = async () => {
        try {
          // Get address for origin
          const originAddress = await getAddressFromCoordinates(origin.latitude, origin.longitude);

          // Get address for destination
          const destinationAddress = await getAddressFromCoordinates(destination.latitude, destination.longitude);

          // If both addresses are available, call the getDistanceAndDuration function
          if (originAddress && destinationAddress) {
            console.log("Origin Address:", originAddress);
            console.log("Destination Address:", destinationAddress);

            // Call getDistanceAndDuration with the obtained addresses
            const result = await getDistanceAndDuration(originAddress, destinationAddress);
            console.log("Distance:", result.distance);
            console.log("Duration:", result.duration);
            console.log("checking if the route was updated",routeData.distance);

          }
        } catch (error) {
          console.error('Error in fetching addresses or calculating distance:', error);
        }
      };

      // Fetch addresses and calculate distance and duration
      fetchAddressesAndCalculateDistance();
    }
  }, [order]); // Only run when order





  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 28.453327,
          longitude: -16.263045,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Display origin and destination markers only if there is an active order */}
        {order && (
          <>
            <Marker coordinate={routeData.origin} title="Origin" />
            <Marker coordinate={routeData.destination} title="Destination" />
          </>
        )}


        {/* Only display the polyline if an order has been accepted and polyline data exists */}
        {order && routeData.polyline.length > 0 && (

          <Polyline coordinates={routeData.polyline} strokeWidth={4} strokeColor="blue" />
        )}
      </MapView>



      <Pressable
        onPress={() => console.warn('Balance')}
        style={styles.balanceButton}>
        <Text style={styles.balanceText}>
          <Text style={{ color: 'yellow' }}>*</Text>
          {' '}
          1 Khair point
        </Text>
      </Pressable>


      <Pressable
        onPress={() => console.warn('Hey')}
        style={[styles.roundButton, { bottom: 110, right: 10 }]}>
        <Entypo name={"menu"} size={24} color="#4a4a4a" />
      </Pressable>


      <Pressable
        onPress={onGoPress}
        style={[styles.roundButton, { bottom: 110, left: 10 }]}>
        <Entypo name={"menu"} size={24} color="#4a4a4a" />
      </Pressable>



      <Pressable
        onPress={() => console.warn('Hey')}
        style={[styles.roundButton, { top: 40, right: 10 }]}>
        <Entypo name={"menu"} size={24} color="#4a4a4a" />
      </Pressable>


      <Pressable
        onPress={() => console.warn('Hey')}
        style={[styles.roundButton, { top: 40, left: 10 }]}>
        <Entypo name={"menu"} size={24} color="#4a4a4a" />
      </Pressable>


      <Pressable
        onPress={() => console.warn('GO')}
        style={styles.goButton}>
        <Text style={styles.goText}>
          {isOnline ? 'END' : 'GO'}
        </Text>
      </Pressable>



      <View style={styles.bottomContainer}>
        <Ionicons name={"options"} size={24} color={"#4a4a4a"}></Ionicons>
        {renderBottomTitle()}
        <Ionicons name={"options"} size={24} color={"#4a4a4a"}></Ionicons>
      </View>

      {newOrder && (
        <NewOrderPopup
          newOrder={newOrder}
          onDecline={onDecline}
          duration={25}
          distance={200}
          onAccept={() => onAccept(newOrder)}
        />
      )}




    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    height: 100,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  bottomText: {
    fontSize: 22,
    color: '#4a4a4a',
  },
  roundButton: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
  },
  headerText: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
  map: {
    flex: 1,
  },
  balanceButton: {
    position: 'absolute',
    backgroundColor: theme.colors.TaupeBlack,
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    top: 10,
    left: Dimensions.get('window').width / 2 - 50,
  },
  balanceText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  goButton: {
    position: 'absolute',
    backgroundColor: theme.colors.sageGreen,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    bottom: 110,
    left: Dimensions.get('window').width / 2 - 30,
  },
  goText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  lm1: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  lm2: {
    backgroundColor: theme.colors.sageGreen,
    marginHorizontal: 10,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,

  }


});

export default RiderHomeScreen;

