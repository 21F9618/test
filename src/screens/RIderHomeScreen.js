// import React, { useState } from "react";
// import { Alert } from "react-native";
// import Background from "../components/Background";
// import BackButton from "../components/BackButton";
// import Header from "../components/Header";
// import TextInput from "../components/TextInput";
// import Button from "../components/Button";

// const GOOGLE_API_KEY = "AIzaSyB9irjntPHdEJf024h7H_XKpS11OeW1Nh8";

// export default function GoogleMapsTestScreen({ navigation }) {
//   const [location, setLocation] = useState({ value: "", error: "" });

//   const fetchPlaceDetails = async () => {
//     if (!location.value) {
//       setLocation({ ...location, error: "Location is required" });
//       return;
//     }

//     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//       location.value
//     )}&key=${GOOGLE_API_KEY}`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();

//       if (data.status === "OK") {
//         const address = data.results[0].formatted_address;
//         Alert.alert("Location Found", `Address: ${address}`);
//       } else {
//         Alert.alert("Error", "Location not found. Try again.");
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to fetch location data.");
//     }
//   };

//   return (
//     <Background>
//       <BackButton goBack={navigation.goBack} />
//       <Header>Google Maps API Test</Header>
//       <TextInput
//         label="Enter a Location"
//         returnKeyType="done"
//         value={location.value}
//         onChangeText={(text) => setLocation({ value: text, error: "" })}
//         error={!!location.error}
//         errorText={location.error}
//         autoCapitalize="none"
//         description="Enter a place name or address."
//       />
//       <Button mode="contained" onPress={fetchPlaceDetails} style={{ marginTop: 16 }}>
//         Get Location Details
//       </Button>
//     </Background>
//   );
// }


//test 2



// import React, { useState } from "react";
// import { View, StyleSheet, Alert } from "react-native";
// import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
// import Background from "../components/Background";
// import BackButton from "../components/BackButton";
// import Header from "../components/Header";
// import TextInput from "../components/TextInput";
// import Button from "../components/Button";

// const GOOGLE_API_KEY = "AIzaSyB9irjntPHdEJf024h7H_XKpS11OeW1Nh8"; // Your API Key

// export default function RiderHomeScreen({ navigation }) {
//   const [location, setLocation] = useState({ value: "", error: "" });
//   const [region, setRegion] = useState(null);
//   const [marker, setMarker] = useState(null);

//   const fetchPlaceDetails = async () => {
//     if (!location.value) {
//       setLocation({ ...location, error: "Location is required" });
//       return;
//     }

//     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//       location.value
//     )}&key=${GOOGLE_API_KEY}`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();

//       if (data.status === "OK") {
//         const place = data.results[0].geometry.location;
//         const formattedAddress = data.results[0].formatted_address;

//         // Update the map region and marker
//         setRegion({
//           latitude: place.lat,
//           longitude: place.lng,
//           latitudeDelta: 0.05,
//           longitudeDelta: 0.05,
//         });
//         setMarker({
//           latitude: place.lat,
//           longitude: place.lng,
//           title: formattedAddress,
//         });

//         Alert.alert("Location Found", `Address: ${formattedAddress}`);
//       } else {
//         Alert.alert("Error", "Location not found. Try again.");
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to fetch location data.");
//     }
//   };

//   return (
//     <Background>
//       <BackButton goBack={navigation.goBack} />
//       <Header>Google Maps API Test</Header>
//       <TextInput
//         label="Enter a Location"
//         returnKeyType="done"
//         value={location.value}
//         onChangeText={(text) => setLocation({ value: text, error: "" })}
//         error={!!location.error}
//         errorText={location.error}
//         autoCapitalize="none"
//         description="Enter a place name or address."
//       />
//       <Button mode="contained" onPress={fetchPlaceDetails} style={{ marginTop: 16 }}>
//         Get Location Details
//       </Button>

//       {/* Display the map only if a location is found */}
//       {region && (
//         <View style={styles.mapContainer}>
//           <MapView 
//             style={styles.map}
//             provider={PROVIDER_GOOGLE} // Required for Google Maps in Expo
//             region={region}
//           >
//             {marker && <Marker coordinate={marker} title={marker.title} />}
//           </MapView>
//         </View>
//       )}
//     </Background>
//   );
// }

// const styles = StyleSheet.create({
//   mapContainer: {
//     marginTop: 16,
//     width: "100%",
//     height: 300,
//     borderRadius: 10,
//     overflow: "hidden",
//   },
//   map: {
//     flex: 1,
//   },
// });


// ////test 4


import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import Header from "../components/Header";
import Button from "../components/Button";

const GOOGLE_API_KEY = "AIzaSyB9irjntPHdEJf024h7H_XKpS11OeW1Nh8"; // Replace with a valid API key

export default function RiderHomeScreen({ navigation }) {
  const [startMarker, setStartMarker] = useState({
    latitude: 37.7749, // San Francisco, CA
    longitude: -122.4194,
    title: "San Francisco, CA",
  });

  const [destinationMarker, setDestinationMarker] = useState({
    latitude: 34.0522, // Los Angeles, CA
    longitude: -118.2437,
    title: "Los Angeles, CA",
  });

  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [alternativeRoutes, setAlternativeRoutes] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [region, setRegion] = useState({
    latitude: 36.0, // Midpoint
    longitude: -120.0,
    latitudeDelta: 5.0,
    longitudeDelta: 5.0,
  });

  useEffect(() => {
    if (startMarker && destinationMarker) {
      getRoute();
    }
  }, [startMarker, destinationMarker]);

  const getRoute = async () => {
    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${startMarker.latitude},${startMarker.longitude}&destination=${destinationMarker.latitude},${destinationMarker.longitude}&alternatives=true&key=${GOOGLE_API_KEY}`;

    try {
      const response = await fetch(directionsUrl);
      const data = await response.json();

      if (data.status === "OK") {
        const mainRoute = data.routes[0]; // The best route
        const alternativeRoutes = data.routes.slice(1); // Other routes

        // Decode the main route
        const mainPoints = decodePolyline(mainRoute.overview_polyline.points);
        setRouteCoordinates(mainPoints);

        // Decode alternative routes
        const altRoutes = alternativeRoutes.map(route => decodePolyline(route.overview_polyline.points));
        setAlternativeRoutes(altRoutes);

        // Set distance and duration
        setDistance(mainRoute.legs[0].distance.text);
        setDuration(mainRoute.legs[0].duration.text);

        Alert.alert(
          "Route Info",
          `Best Route: ${mainRoute.summary}\nDistance: ${mainRoute.legs[0].distance.text}\nTime: ${mainRoute.legs[0].duration.text}`
        );
      } else {
        Alert.alert("Error", "Failed to get route. Try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch route data.");
      console.error("Error fetching route:", error);
    }
  };

  // Function to decode polyline from Google Maps API
  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0,
      lat = 0,
      lng = 0;

    while (index < encoded.length) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }

    return points;
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Google Maps Route</Header>

      <Button mode="contained" onPress={getRoute} style={{ marginTop: 16 }}>
        Get Shortest Route
      </Button>

      {region && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={region}
          >
            {startMarker && (
              <Marker coordinate={startMarker} title={startMarker.title} />
            )}
            {destinationMarker && (
              <Marker
                coordinate={destinationMarker}
                title={destinationMarker.title}
                pinColor="blue"
              />
            )}

            {/* **Main Route - Thick Red Line** */}
            {routeCoordinates.length > 0 && (
              <Polyline
                coordinates={routeCoordinates}
                strokeWidth={6} // **Thicker Line**
                strokeColor="red"
              />
            )}

            {/* **Alternative Routes - Thinner Gray Lines** */}
            {alternativeRoutes.map((route, index) => (
              <Polyline
                key={index}
                coordinates={route}
                strokeWidth={4} // **Slightly Thinner**
                strokeColor="gray" // **Different Color**
                lineDashPattern={[10, 5]} // Dashed for alternatives
              />
            ))}
          </MapView>
        </View>
      )}

      {distance && duration && (
        <View style={styles.infoContainer}>
          <Header>Distance: {distance}</Header>
          <Header>Time: {duration}</Header>
        </View>
      )}
    </Background>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    marginTop: 16,
    width: "100%",
    height: 300,
    borderRadius: 10,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
  infoContainer: {
    marginTop: 16,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
});
