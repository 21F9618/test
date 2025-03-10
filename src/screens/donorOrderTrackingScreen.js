"use client"

import { useState, useEffect, useRef } from "react"
import { View, Text, StyleSheet, Dimensions, Pressable, ActivityIndicator, SafeAreaView } from "react-native"
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"
import MapViewDirections from "react-native-maps-directions"
import { Ionicons, MaterialIcons, FontAwesome5 } from "react-native-vector-icons"
import firestore from "@react-native-firebase/firestore"

// Status mapping for user-friendly display
const statusMessages = {
  pending: "Waiting for a rider...",
  accepted: "Rider is on the way to pickup",
  picked_up: "Your donation has been picked up",
  delivering: "Your donation is being delivered",
  delivered: "Delivery completed",
  cancelled: "Order was cancelled",
}

// Status colors
const statusColors = {
  pending: "#f5a623",
  accepted: "#4a90e2",
  picked_up: "#7ed321",
  delivering: "#7ed321",
  delivered: "#4a90e2",
  cancelled: "#d0021b",
}

// Replace with your Google Maps API key
const GOOGLE_API_KEY = "AIzaSyB9irjntPHdEJf024h7H_XKpS11OeW1Nh8"

const donorOrderTrackingScreen = ({ route, navigation }) => {
  const { orderId } = route.params

  // State variables
  const [order, setOrder] = useState(null)
  const [rider, setRider] = useState(null)
  const [riderLocation, setRiderLocation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pickupETA, setPickupETA] = useState(null)
  const [deliveryETA, setDeliveryETA] = useState(null)
  const [pickupDistance, setPickupDistance] = useState(null)
  const [deliveryDistance, setDeliveryDistance] = useState(null)
  const [orderStatus, setOrderStatus] = useState("pending")

  const mapRef = useRef(null)

  // Listen for order updates
  useEffect(() => {
    if (!orderId) {
      setError("No order ID provided")
      setLoading(false)
      return
    }

    console.log(`Tracking order: ${orderId}`)

    // Subscribe to order updates
    const orderUnsubscribe = firestore()
      .collection("orders")
      .doc(orderId)
      .onSnapshot(
        (documentSnapshot) => {
          if (documentSnapshot.exists) {
            const orderData = {
              id: documentSnapshot.id,
              ...documentSnapshot.data(),
            }

            setOrder(orderData)
            setOrderStatus(orderData.status)

            // If order has a rider assigned, get rider details
            if (orderData.riderId && orderData.status !== "pending") {
              fetchRiderDetails(orderData.riderId)
            }
          } else {
            setError("Order not found")
            setLoading(false)
          }
        },
        (error) => {
          console.error("Error fetching order:", error)
          setError("Failed to load order details")
          setLoading(false)
        },
      )

    return () => {
      orderUnsubscribe()
    }
  }, [orderId])

  // Fetch rider details and set up location tracking
  const fetchRiderDetails = (riderId) => {
    console.log(`Fetching rider details for: ${riderId}`)

    // Get rider details
    firestore()
      .collection("riders")
      .doc(riderId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const riderData = {
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          }

          setRider(riderData)
          console.log(riderData)

          // Subscribe to rider location updates
          trackRiderLocation(riderId)
        }
      })
      .catch((error) => {
        console.error("Error fetching rider details:", error)
      })
  }

  // Track rider location in real-time
  const trackRiderLocation = (riderId) => {
    console.log(`Tracking rider location for: ${riderId}`)
    // Subscribe to rider location updates
    const locationUnsubscribe = firestore()
      .collection("riders")
      .doc(riderId)
      .collection("location")
      .doc("current")
      .onSnapshot(
        (documentSnapshot) => {
          if (documentSnapshot.exists) {
            const locationData = documentSnapshot.data()
            if (locationData && locationData.latitude && locationData.longitude) {
              setRiderLocation({
                latitude: locationData.latitude,
                longitude: locationData.longitude,
                heading: locationData.heading || 0,
                timestamp: locationData.timestamp || firestore.Timestamp.now(),
              })

              setLoading(false)

              // Fit map to show rider and destination
              fitMapToMarkers()
            }
          }
        },
        (error) => {
          console.error("Error tracking rider location:", error)
        },
      )

    return locationUnsubscribe
  }

  // Fit map to show all relevant markers
  const fitMapToMarkers = () => {
    if (mapRef.current && order && riderLocation) {
      const points = []

      // Add rider location
      points.push(riderLocation)

      // Add pickup location if not picked up yet
      if (order.status === "accepted" && order.origin) {
        points.push(order.origin)
      }

      // Add destination
      if (order.destination) {
        points.push(order.destination)
      }

      if (points.length > 1) {
        mapRef.current.fitToCoordinates(points, {
          edgePadding: { top: 100, right: 50, bottom: 150, left: 50 },
          animated: true,
        })
      }
    }
  }

  // Calculate ETA and distance when rider location or order status changes
  useEffect(() => {
    if (riderLocation && order) {
      calculateETAAndDistance()
    }
  }, [riderLocation, orderStatus])

  // Calculate ETA and distance
  const calculateETAAndDistance = () => {
    if (!riderLocation || !order) return

    // If order is accepted but not picked up yet, calculate pickup ETA
    if (order.status === "accepted" && order.origin) {
      // This would ideally use the directions API for accurate estimates
      // For now, we'll use a simple calculation (1 minute per km at 60km/h)
      const distance = haversineDistance(riderLocation, order.origin)
      setPickupDistance(distance)
      setPickupETA(Math.ceil(distance * 2)) // Rough estimate: 2 minutes per km
    }

    // If order is picked up, calculate delivery ETA
    if ((order.status === "picked_up" || order.status === "delivering") && order.destination) {
      const distance = haversineDistance(riderLocation, order.destination)
      setDeliveryDistance(distance)
      setDeliveryETA(Math.ceil(distance * 2)) // Rough estimate: 2 minutes per km
    }
  }

  // Haversine formula to calculate distance between two coordinates
  const haversineDistance = (coord1, coord2) => {
    if (!coord1 || !coord2) return 0

    const R = 6371 // Earth's radius in km
    const dLat = (coord2.latitude - coord1.latitude) * (Math.PI / 180)
    const dLon = (coord2.longitude - coord1.longitude) * (Math.PI / 180)
    const lat1 = coord1.latitude * (Math.PI / 180)
    const lat2 = coord2.latitude * (Math.PI / 180)

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c // Distance in km
  }

  // Render loading state
  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#48d42a" />
        <Text style={styles.loadingText}>Connecting to your order...</Text>
      </View>
    )
  }

  // Render error state
  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Ionicons name="alert-circle" size={60} color="#d0021b" />
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Status Bar */}
      <View style={[styles.statusBar, { backgroundColor: statusColors[orderStatus] || "#f5a623" }]}>
        <Text style={styles.statusText}>{statusMessages[orderStatus] || "Tracking your order..."}</Text>
      </View>

      {/* Map View */}
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: order?.origin?.latitude || 37.78825,
          longitude: order?.origin?.longitude || -122.4324,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Pickup Location Marker */}
        {order?.origin && orderStatus === "accepted" && (
          <Marker coordinate={order.origin} title="Pickup Location" description="Your donation pickup location">
            <View style={styles.pickupMarker}>
              <MaterialIcons name="location-on" size={30} color="#4a90e2" />
            </View>
          </Marker>
        )}

        {/* Destination Marker */}
        {order?.destination && (
          <Marker coordinate={order.destination} title="Destination" description="Delivery destination">
            <View style={styles.destinationMarker}>
              <MaterialIcons name="location-on" size={30} color="#7ed321" />
            </View>
          </Marker>
        )}

        {/* Rider Location Marker */}
        {riderLocation && (
          <Marker
            coordinate={riderLocation}
            title="Rider"
            description={rider?.name || "Your rider"}
            rotation={riderLocation.heading}
          >
            <View style={styles.riderMarker}>
              <FontAwesome5 name="motorcycle" size={20} color="#ffffff" />
            </View>
          </Marker>
        )}

        {/* Route to Pickup - Only show when rider is heading to pickup */}
        {riderLocation && order?.origin && orderStatus === "accepted" && (
          <MapViewDirections
            origin={riderLocation}
            destination={order.origin}
            apikey={GOOGLE_API_KEY}
            strokeWidth={4}
            strokeColor="#4a90e2"
            onReady={(result) => {
              setPickupDistance(result.distance)
              setPickupETA(Math.ceil(result.duration))
            }}
          />
        )}

        {/* Route to Destination - Only show after pickup */}
        {riderLocation && order?.destination && (orderStatus === "picked_up" || orderStatus === "delivering") && (
          <MapViewDirections
            origin={riderLocation}
            destination={order.destination}
            apikey={GOOGLE_API_KEY}
            strokeWidth={4}
            strokeColor="#7ed321"
            onReady={(result) => {
              setDeliveryDistance(result.distance)
              setDeliveryETA(Math.ceil(result.duration))
            }}
          />
        )}
      </MapView>

      {/* Bottom Info Panel */}
      <View style={styles.bottomPanel}>
        {/* Order ID and Rider Info */}
        <View style={styles.orderInfoContainer}>
          <Text style={styles.orderIdText}>Order #{order?.id?.substring(0, 6)}</Text>
          {rider && (
            <View style={styles.riderInfoContainer}>
              <View style={styles.riderAvatar}>
                <FontAwesome5 name="user" size={20} color="#ffffff" />
              </View>
              <View>
                <Text style={styles.riderNameText}>{rider.name || rider.id}</Text>
                <Text style={styles.riderRatingText}>
                  <Ionicons name="star" size={14} color="#f5a623" />
                  {rider.rating || "4.8"}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* ETA and Distance Info */}
        <View style={styles.etaContainer}>
          {orderStatus === "accepted" && (
            <>
              <Text style={styles.etaLabel}>Estimated pickup time:</Text>
              <Text style={styles.etaValue}>{pickupETA ? `${pickupETA} min` : "Calculating..."}</Text>
              <Text style={styles.distanceText}>{pickupDistance ? `${pickupDistance.toFixed(1)} km away` : ""}</Text>
            </>
          )}

          {(orderStatus === "picked_up" || orderStatus === "delivering") && (
            <>
              <Text style={styles.etaLabel}>Estimated delivery time:</Text>
              <Text style={styles.etaValue}>{deliveryETA ? `${deliveryETA} min` : "Calculating..."}</Text>
              <Text style={styles.distanceText}>
                {deliveryDistance ? `${deliveryDistance.toFixed(1)} km away` : ""}
              </Text>
            </>
          )}

          {orderStatus === "delivered" && <Text style={styles.deliveredText}>Your donation has been delivered!</Text>}

          {orderStatus === "pending" && (
            <Text style={styles.pendingText}>Waiting for a rider to accept your order...</Text>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <Pressable style={styles.contactButton} onPress={() => console.log("Contact rider")}>
            <Ionicons name="call" size={20} color="#ffffff" />
            <Text style={styles.contactButtonText}>Contact</Text>
          </Pressable>

          <Pressable style={styles.supportButton} onPress={() => console.log("Contact support")}>
            <Ionicons name="help-circle" size={20} color="#ffffff" />
            <Text style={styles.supportButtonText}>Support</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#4a4a4a",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: "#4a4a4a",
    textAlign: "center",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#4a90e2",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  statusBar: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  statusText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.6,
  },
  pickupMarker: {
    alignItems: "center",
    justifyContent: "center",
  },
  destinationMarker: {
    alignItems: "center",
    justifyContent: "center",
  },
  riderMarker: {
    backgroundColor: "#4a90e2",
    borderRadius: 15,
    padding: 5,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  bottomPanel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  orderInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  orderIdText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4a4a4a",
  },
  riderInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  riderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4a90e2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  riderNameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4a4a4a",
  },
  riderRatingText: {
    fontSize: 14,
    color: "#7d7d7d",
  },
  etaContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  etaLabel: {
    fontSize: 14,
    color: "#7d7d7d",
    marginBottom: 5,
  },
  etaValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4a4a4a",
    marginBottom: 5,
  },
  distanceText: {
    fontSize: 14,
    color: "#7d7d7d",
  },
  deliveredText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7ed321",
    marginVertical: 10,
  },
  pendingText: {
    fontSize: 16,
    color: "#f5a623",
    marginVertical: 10,
    textAlign: "center",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contactButton: {
    backgroundColor: "#4a90e2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  contactButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  supportButton: {
    backgroundColor: "#7d7d7d",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
  },
  supportButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
})

export default donorOrderTrackingScreen

