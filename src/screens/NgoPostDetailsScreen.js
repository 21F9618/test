import React from 'react';
import { SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, ScrollView, View } from 'react-native';
import { theme } from '../core/theme';
import BackButton from "../components/BackButton";
import Button from "../components/Button";


export default function NgoPostDetailsScreen({ route, navigation }) {
  const { title, description, image } = route.params;


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButtonWrapper}>
        <BackButton goBack={navigation.goBack} />
      </View>
      <ScrollView>
        <Image source={image} style={styles.detailsImage} />
        <Text style={styles.detailsTitle}>{title}</Text>
        <Text style={styles.detailsDescription}>{description}</Text>
        <Text style={styles.poeticLine}>
          "Extend your hand, where hope begins, and kindness wins."
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            style={styles.button}
          >
            Donate Now
          </Button>
        </View>

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
    color: theme.colors.ivory,
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
  buttonContainer: {
    marginTop: 10, // Add some space from the content above
    alignItems: 'center', // Horizontally center the button
    paddingBottom: 20,  // Padding at the bottom
  },
  poeticLine: {
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 10,
    color: theme.colors.ivory,
  },
});
