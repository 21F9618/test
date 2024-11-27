import React from 'react';
import { SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, ScrollView, View } from 'react-native';
import { theme } from '../core/theme';
import BackButton from "../components/BackButton";


export function NgoPostDetailsScreen({ route , navigation }) {
    const { title, description, image } = route.params;
  
    return (
      <SafeAreaView style={styles.container}>
         <View style={styles.backButtonWrapper}>
        <BackButton goBack={navigation.goBack} />
      </View>
        <ScrollView>
          <Image source={{ uri: image }} style={styles.detailsImage} />
          <Text style={styles.detailsTitle}>{title}</Text>
          <Text style={styles.detailsDescription}>{description}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.TaupeBlack,
      padding: 10,
    },
    detailsImage: {
      height: 300,
      width: '100%',
      marginBottom: 16,
    },
    detailsTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 8,
      color:theme.colors.ivory,
    },
    detailsDescription: {
      fontSize: 16,
      lineHeight: 24,
      textAlign: 'justify',
      marginVertical: 8,
      color: theme.colors.ivory,
    },
    backButtonWrapper: {
        position: 'absolute',
        top: 5, 
        left: 0, 
      },
  });
  