import React, { useState, useEffect,useRef } from "react";
import { View, Text, Dimensions, Pressable, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from "react-native-maps"
import MapViewDirections from 'react-native-maps-directions';
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
// import NewOrderPopup from "../../components/NewOrderPopup";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NewOrderPopup from "../components/NewOrderPopup";
import * as Location from 'expo-location';


const GOOGLE_API_KEY = "AIzaSyB9irjntPHdEJf024h7H_XKpS11OeW1Nh8";
const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };

const RiderFinalHomeScreen = ({ navigation }) => {
    const [myPosition, setMyPosition] = useState(null);
    const [order, setOrder] = useState(null);
    const [newOrder, setNewOrder] = useState({
        id: '1',
        type: 'Clothes',
        origin: { latitude: 37.3318456, longitude: -122.0296002 },
        destination: { latitude: 37.771707, longitude: -122.4053769 },
        user: { rating: 5.0, name: 'Eishah Nadeem' }
    });
    const [isOnline, setIsOnline] = useState(false);
    const mapRef = useRef(null);

    const onDecline = () => {
        setNewOrder(null);
    };

    const onAccept = (newOrder) => {
        console.log("Order accepted:", newOrder);
        setOrder(newOrder);
        setNewOrder(null);

        if (mapRef.current) {
            mapRef.current.fitToCoordinates(
                [newOrder.origin, newOrder.destination],
                { edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }, animated: true }
            );
        }
    };

    const onGopress = () => {
        setIsOnline(!isOnline);
    };

    const onUserLocationChange = (event) => {
        const newLocation = event.nativeEvent.coordinate;
        console.log("📍 New Position Update:", newLocation);
    
        if (newLocation && newLocation.latitude && newLocation.longitude) {
            setMyPosition(newLocation);
            console.log("✅ Position updated in state:", newLocation);
        } else {
            console.log("⚠️ Position update failed!");
        }
    };
    

    const onDirectionFound= (event) => {
        console.log("user directions", event);
    };

    const renderBottomTitle = () => {
        if (order) {
            return (
                <View style={{ alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>1 min </Text>
                        <View style={{ backgroundColor: '#48d42a', width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: 20, marginHorizontal: 10 }}>
                            <FontAwesome name={"user"} color={"white"} size={20} />
                        </View>
                        <Text> 0.2</Text>
                    </View>
                    <Text style={styles.bottomTextuser}>
                        Picking up donation from {"\n"}{order.user.name}
                    </Text>
                </View>
            );
        }
        return <Text style={styles.bottomText}>{isOnline ? "You're Online" : "You're Offline"}</Text>;
    };

    return (
        <View>
            <MapView
                 ref={mapRef}
                 style={{ width: '100%', height: Dimensions.get('window').height - 120 }}
                 provider={PROVIDER_GOOGLE}
                 showsUserLocation={true}  // ✅ Enables user location (blue dot)
                 followsUserLocation={true} // ✅ (Optional) Keeps the camera centered
                 onUserLocationChange={onUserLocationChange} // ✅ Handles user movement
                 initialRegion={{
                     latitude: myPosition?.latitude || 36.0,  // ✅ Use `myPosition` if available
                     longitude: myPosition?.longitude || -120.0,
                     latitudeDelta: 5.0,
                     longitudeDelta: 5.0,
                 }}
            >
                {order && (
                    <MapViewDirections
                        origin={myPosition}
                        destination={order.destination}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={5}
                        strokeColor="red"
                        onReady={(result) => {
                            console.log("Polyline coordinates:", result.coordinates);
                            if (mapRef.current) {
                                mapRef.current.fitToCoordinates(result.coordinates, {
                                    edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                                    animated: true,
                                });
                            }
                        }}
                    />
                )}
            </MapView>
            <Pressable
                onPress={() => console.warn('Balance')}
                style={styles.balanceButton}>
                <Text style={styles.balanceText}>
                    <Text style={{ color: 'green' }}>$</Text>
                    {' '}
                    0.00
                </Text>
            </Pressable>
            <Pressable
                onPress={() => console.warn('Hey')}
                style={[styles.roundButton, { top: 10, left: 10 }]} // ✅ Correct syntax
            >
                <Entypo name={"menu"} size={24} color={"black"} />
            </Pressable>

            <Pressable
                onPress={() => console.warn('Hey')}
                style={[styles.roundButton, { top: 10, right: 10 }]} // ✅ Correct syntax
            >
                <Entypo name={"menu"} size={24} color={"black"} />
            </Pressable>

            <Pressable
                onPress={() => console.warn('Hey')}
                style={[styles.roundButton, { bottom: 110, left: 10 }]} // ✅ Correct syntax
            >
                <Entypo name={"menu"} size={24} color={"black"} />
            </Pressable>

            <Pressable
                onPress={() => console.warn('Hey')}
                style={[styles.roundButton, { bottom: 110, right: 10 }]} // ✅ Correct syntax
            >
                <Entypo name={"menu"} size={24} color={"black"} />
            </Pressable>


            <Pressable onPress={onGopress} style={[styles.goButton, { bottom: 110, right: 10 }]}>
                <Text style={styles.goText}>{isOnline ? 'END' : 'GO'}</Text>
            </Pressable>

            <View style={styles.bottomContainer}>
                <Ionicons name={"options"} size={30} color={"black"} />
                {renderBottomTitle()}
                <Ionicons name={"options"} size={30} color={"black"} />
            </View>

            {newOrder && (
                <NewOrderPopup
                    newOrder={newOrder}
                    duration={8}
                    distance={5}
                    onDecline={onDecline}
                    onAccept={() => onAccept(newOrder)}
                />
            )}
        </View>
    );
};





const styles = StyleSheet.create({
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
    bottomTextuser: {
        fontSize: 18,
        color: '#4a4a4a',
    },
    roundButton: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 25,
    },
    goButton: {
        position: 'absolute',
        backgroundColor: '#1495ff',
        width: 75,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        bottom: 110,
        left: Dimensions.get('window').width / 2 - 37,
    },
    goText: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },

    balanceButton: {
        position: 'absolute',
        backgroundColor: '#1c1c1c',
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        top: 10,
        left: Dimensions.get('window').width / 2 - 50,
    },
    balanceText: {
        fontSize: 19,
        color: 'white',
        fontWeight: 'bold',
    }
});

export default RiderFinalHomeScreen;

////////////////////////////////////////////

// import { useState, useEffect, useRef } from "react";
// import { View, Dimensions, Alert } from "react-native";
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// import * as Location from 'expo-location';  // ✅ Import Expo Location

// const RiderFinalHomeScreen = () => {
//     const [myPosition, setMyPosition] = useState(null);
//     const mapRef = useRef(null);

//     useEffect(() => {
//         (async () => {
//             let { status } = await Location.requestForegroundPermissionsAsync();
//             if (status !== 'granted') {
//                 Alert.alert("Permission Denied", "Enable location services to use this feature.");
//                 return;
//             }

//             let location = await Location.getCurrentPositionAsync({});
//             setMyPosition({
//                 latitude: location.coords.latitude,
//                 longitude: location.coords.longitude,
//             });
//             console.log("📍 Initial Position:", location.coords); // ✅ Debug log
//         })();
//     }, []);

//     const onUserLocationChange = (event) => {
//         const newLocation = event.nativeEvent.coordinate;
//         console.log("📍 New Position Update:", newLocation);

//         if (newLocation && newLocation.latitude && newLocation.longitude) {
//             setMyPosition(newLocation);
//             console.log("✅ Position updated in state:", newLocation);
//         } else {
//             console.log("⚠️ Position update failed!");
//         }
//     };

//     return (
//         <View style={{ flex: 1 }}>
//             <MapView
//                 ref={mapRef}
//                 style={{ width: '100%', height: Dimensions.get('window').height - 120 }}
//                 provider={PROVIDER_GOOGLE}
//                 showsUserLocation={true}  // ✅ Displays blue dot
//                 followsUserLocation={true} // ✅ Keeps camera centered on user
//                 onUserLocationChange={onUserLocationChange} // ✅ Handles movement updates
//                 initialRegion={{
//                     latitude: myPosition?.latitude || 36.0,  // ✅ Uses state if available
//                     longitude: myPosition?.longitude || -120.0,
//                     latitudeDelta: 5.0,
//                     longitudeDelta: 5.0,
//                 }}
//             />
//         </View>
//     );
// };

// export default RiderFinalHomeScreen;




// import react from "react";
// import { View, Text } from "react-native";
// import MapView ,{PROVIDER_GOOGLE} from "react-native-maps";
// import MapViewDirections from 'react-native-maps-directions';
// const GOOGLE_API_KEY = "AIzaSyB9irjntPHdEJf024h7H_XKpS11OeW1Nh8";
// const origin = { latitude: 37.3318456, longitude: -122.0296002};
// const destination = { latitude: 37.771707, longitude: -122.4053769 };

// const RiderFinalHomeScreen = ({ navigation }) => {
//     return(
//         <View>
//             <Text>fuck this </Text>
//             <MapView
//             style={{width:'100%',height:'100%'}}
//             provider={PROVIDER_GOOGLE}
//             initialRegion={{
//                 latitude: 37.78825,
//                 longitude: -122.4324,
//                 latitudeDelta: 0.0922,
//                 longitudeDelta: 0.0421,
//             }}
//             >

//                 <MapViewDirections 
//                 origin={origin}
//                 destination={destination}
//                 apikey={GOOGLE_API_KEY}/>


//             </MapView>
//         </View>
//     )
// }

// export default RiderFinalHomeScreen;