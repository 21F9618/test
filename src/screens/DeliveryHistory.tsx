import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { theme } from '../core/theme';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'; // For getting current user

const DeliveryHistory = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentRiderId, setCurrentRiderId] = useState(null);

  // Get current rider ID
  useEffect(() => {
    const getCurrentRider = async () => {
      const currentUser = auth().currentUser;
      if (currentUser) {
        // Assuming the user's UID is used as the riderId
        // If not, you might need to fetch the rider profile from another collection
        setCurrentRiderId(currentUser.uid);
        console.log("Current rider ID:", currentUser.uid);
      } else {
        setError("User not logged in");
        setLoading(false);
      }
    };

    getCurrentRider();
  }, []);

  // Fetch deliveries for the current rider
  useEffect(() => {
    if (!currentRiderId) return; // Don't fetch if we don't have the rider ID yet
    
    console.log("Fetching delivery history for rider:", currentRiderId);
    
    // Set up real-time listener for the deliveries_made collection
    const unsubscribe = firestore()
      .collection('deliveries_made')
      .where('riderId', '==', currentRiderId) // Only get this rider's deliveries
      .orderBy('timestamp', 'desc') // Assuming you have a timestamp field
      .onSnapshot(snapshot => {
        console.log("Deliveries_made collection accessed.");
        
        if (snapshot.empty) {
          console.log("No deliveries found for this rider.");
          setDeliveries([]);
          setLoading(false);
          return;
        }
        
        console.log(`Found ${snapshot.docs.length} deliveries for this rider.`);
        
        const deliveryData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
          };
        });
        
        setDeliveries(deliveryData);
        setLoading(false);
        console.log("Delivery history updated.");
      }, error => {
        console.error("Error accessing Firestore for delivery history:", error);
        setError("Failed to load delivery history");
        setLoading(false);
      });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [currentRiderId]);

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading your delivery history...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Delivery History</Text>
      {deliveries.length === 0 ? (
        <Text style={styles.emptyText}>You haven't made any deliveries yet</Text>
      ) : (
        <FlatList
          data={deliveries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.deliveryItem}>
              <Text style={styles.deliveryTitle}>
                Order #{item.orderId ? item.orderId.substring(0, 6) : 'Unknown'}
              </Text>
              
              <View style={styles.deliveryDetails}>
                <Text style={styles.customerInfo}>
                  Customer ID: {item.customerId || 'Unknown'}
                </Text>
                
                {item.distance && (
                  <Text style={styles.distanceInfo}>
                    Distance: {item.distance} km
                  </Text>
                )}
                
                <Text style={styles.deliveryDate}>
                  {item.timestamp ? new Date(item.timestamp.toDate()).toLocaleDateString() : 'No date'}
                </Text>
              </View>
              
              {item.earnings && (
                <Text style={styles.deliveryEarnings}>
                  Earnings: ${parseFloat(item.earnings).toFixed(2)}
                </Text>
              )}
              
              {item.status && (
                <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};

// Helper function to determine status style
const getStatusStyle = (status) => {
  switch(status) {
    case 'completed':
      return styles.completedStatus;
    case 'cancelled':
      return styles.cancelledStatus;
    default:
      return styles.otherStatus;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.ivory,
    marginBottom: 20,
  },
  deliveryItem: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: theme.colors.sageGreen,
    marginBottom: 10,
    shadowColor: theme.colors.charcoalBlack,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  deliveryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.ivory,
  },
  deliveryDetails: {
    marginTop: 8,
  },
  customerInfo: {
    fontSize: 14,
    color: theme.colors.pearlWhite,
  },
  distanceInfo: {
    fontSize: 14,
    color: theme.colors.pearlWhite,
    marginTop: 2,
  },
  deliveryDate: {
    fontSize: 14,
    color: theme.colors.pearlWhite,
    marginTop: 2,
  },
  deliveryEarnings: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.ivory,
    marginTop: 8,
  },
  loadingText: {
    marginTop: 10,
    color: theme.colors.ivory,
    fontSize: 16,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyText: {
    color: theme.colors.ivory,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  statusBadge: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  completedStatus: {
    backgroundColor: '#4caf50', // Green
  },
  cancelledStatus: {
    backgroundColor: '#f44336', // Red
  },
  otherStatus: {
    backgroundColor: '#9e9e9e', // Gray
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default DeliveryHistory;