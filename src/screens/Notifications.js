import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { getBaseUrl } from '../helpers/deviceDetection';
import { theme } from '../core/theme'; // Import your theme object for colors

const Notifications = ({ route }) => {
    const { role } = route.params;
    const [notifications, setNotifications] = useState([]);
    const [message, setMessage] = useState('');
    const { user } = useContext(AuthContext);
    const isDonor = role && role.toLowerCase() === 'donor';

    useEffect(() => {
        const fetchNotifications = async () => {
            if (isDonor) {
                try {
                    const BASE_URL = await getBaseUrl();
                    const response = await axios.get(`${BASE_URL}/api/claimed-items`);
                    
                    if (response.data.status === 'success') {
                        const donorItems = response.data.data.filter(
                            (item) => item.donorUsername === user.username
                        );
        
                        if (donorItems.length > 0) {
                            setNotifications(donorItems);
                        } else {
                            setMessage('No items claimed for this donor.');
                        }
                    } else {
                        setMessage('No claimed items found.');
                    }
                } catch (error) {
                    console.error('Error fetching notifications:', error);
                    setMessage('Failed to load notifications.');
                }
            }
        };

        if (role && user && user.username) {
            fetchNotifications();
        }
    }, [role, user]);

    const handleApprove = async (id) => {
        try {
            const BASE_URL = await getBaseUrl();  // If you're using a base URL helper function

            await axios.post(`${BASE_URL}/api/approve-claim`, { id }); // Pass the id in the request body

            setMessage('Claim approved successfully.');
            setNotifications(notifications.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error approving claim:', error);
            setMessage('Failed to approve the claim.');
        }
    };

    const declineClaim = async (id) => {
        try {
            // API call to delete the claim from the database
            const BASE_URL = await getBaseUrl();  // If you're using a base URL helper function
            const response = await axios.delete(`${BASE_URL}/api/delete-claim/${id}`); // Adjust the API endpoint based on your backend
    
            if (response.data.status === 'success') {
                // Update the notifications state to remove the declined item
                setNotifications(notifications.filter((item) => item.id !== id));
                setMessage('Claim declined successfully.');
            } else {
                setMessage('Failed to decline the claim.');
            }
        } catch (error) {
            console.error('Error declining claim:', error);
            setMessage('Failed to decline the claim.');
        }
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Notifications</Text>
            </View>

            {message && <Text style={styles.message}>{message}</Text>}
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {notifications.length > 0 ? (
                    notifications.map((item) => (
                        <View key={item.id} style={styles.notificationItem}>
                            <Text style={styles.itemText}>Date of Claim: {item.claimDate}</Text>
                            <Text style={styles.itemText}>Item type: {item.donationType}</Text>
                            <Text style={styles.itemText}>Claimed by: {item.claimerUsername}</Text>
                            <Text style={styles.itemText}>Item name: {item.itemName}</Text>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.approveButton} onPress={() => handleApprove(item.id)}>
                                    <Text style={styles.buttonText}>Approve</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.declineButton} onPress={() => declineClaim(item.id)}>
                                    <Text style={styles.buttonText}>Decline</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noNotificationText}>No new notifications.</Text>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.charcoalBlack,
        padding: 10,
    },
    header: {
        padding: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: theme.colors.sageGreen,
    },
    title: {
        fontSize: 30,
        color: theme.colors.ivory,
        fontWeight: 'bold',
    },
    message: {
        color: theme.colors.ivory,
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 16,
    },
    scrollViewContent: {
        paddingBottom: 20, // Extra padding for the scrollable content
    },
    notificationItem: {
        backgroundColor: theme.colors.outerSpace,
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: theme.colors.sageGreen,
        shadowColor: theme.colors.sageGreen,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 5,
    },
    itemText: {
        fontSize: 18,
        color: theme.colors.ivory,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    approveButton: {
        backgroundColor: theme.colors.sageGreen,
        padding: 10,
        borderRadius: 15,
    },
    declineButton: {
        backgroundColor: theme.colors.copper,
        padding: 10,
        borderRadius: 15,
    },
    buttonText: {
        color: theme.colors.ivory,
        fontWeight: 'bold',
        fontSize: 16,
    },
    noNotificationText: {
        fontSize: 18,
        color: theme.colors.ivory,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default Notifications;
