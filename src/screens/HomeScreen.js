import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { TouchableOpacity, StyleSheet, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Welcome to Dast e Khair</Text>
    <Text style={styles.subtitle}>Your place to give and receive help</Text>

    <Button
      title="Go to Donations"
      onPress={() => navigation.navigate('/tabs')}
    />
  </View>
  );
}