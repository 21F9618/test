import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // For navigation
import { theme } from '../core/theme'; // Importing custom theme

const Profile = () => {
  const navigation = useNavigation();

  // Animating the profile image on mount
  const imageScale = new Animated.Value(0.8);

  React.useEffect(() => {
    Animated.timing(imageScale, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Recipient Profile</Text>

      {/* Background Gradient */}
      <View style={styles.backgroundContainer} />

      {/* Profile Image with Animation */}
      <View style={styles.profileContainer}>
        <Animated.View style={[styles.profileImageContainer, { transform: [{ scale: imageScale }] }]}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }} // Placeholder image for profile picture
            style={styles.profileImage}
          />
        </Animated.View>

        <Text style={styles.username}>Username</Text>
        <Text style={styles.khairPoints}>
          <Text style={styles.star}>★</Text> 100 Khair Points
        </Text>
        <Text style={styles.phone}>Phone: 123-456-7890</Text>
        <Text style={styles.email}>Email: user@example.com</Text>
        <Text style={styles.totalClaims}>Total Claims: 5</Text>
      </View>

      {/* Logout Button with Animation */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => {}}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,  // Background color for the whole screen
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: theme.colors.primary,  // Gradient-like color for background
    opacity: 0.4,
    borderRadius: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.colors.ivory,  // Using ivory for the heading text
    marginBottom: 30,
    textAlign: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 40,
    padding: 20,
    backgroundColor: 'transparent',  // No card background, keeping it open
  },
  profileImageContainer: {
    backgroundColor: theme.colors.primary,
    padding: 8,
    borderRadius: 60,
    marginBottom: 20,
    shadowColor: theme.colors.outerSpace,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: theme.colors.sageGreen,  // Border in sage green
  },
  username: {
    fontSize: 26,
    fontWeight: '800',
    color: theme.colors.ivory,  // Ivory for username
    marginBottom: 10,
  },
  khairPoints: {
    fontSize: 20,
    color: theme.colors.sageGreen,
    marginBottom: 12,
    fontWeight: '500',
  },
  star: {
    color: theme.colors.copper,  // Copper for the star
  },
  phone: {
    fontSize: 18,
    color: theme.colors.ivory,
    marginBottom: 8,
  },
  email: {
    fontSize: 18,
    color: theme.colors.ivory,
    marginBottom: 8,
  },
  totalClaims: {
    fontSize: 18,
    color: theme.colors.ivory,
    marginBottom: 25,
  },
  logoutButton: {
    backgroundColor: theme.colors.sageGreen,
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 10,
    shadowColor: theme.colors.charcoalBlack,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    transition: 'all 0.3s ease',  // Smooth transition effect
  },
  logoutText: {
    fontSize: 20,
    color: theme.colors.ivory,
    fontWeight: '600',
  },
});

export default Profile;
