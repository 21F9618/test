import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View, ImageBackground, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import * as DocumentPicker from 'expo-document-picker'; 
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import { idCardValidator } from "../helpers/idCardValidator";

export default function RegisterIndividualScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [idCard, setidCard] = useState({ value: "", error: "" });
 

  

  // Handle the document pick and store the result in state
  

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const idCardError = idCardValidator(idCard.value);
    if (emailError || passwordError || nameError || idCardError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setidCard({ ...idCard, error: idCardError });
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{ name: "HomeScreen" }],
    });
  };

  return (
    <ImageBackground 
      source={require('../../assets/items/0d59de270836b6eafe057c8afb642e77.jpg')} 
      style={styles.imageBackground}
      blurRadius={8} // Adjust the blur intensity
    >
      <BackButton goBack={navigation.goBack} />
      <View style={styles.container}>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        style={styles.input}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        style={styles.input}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        style={styles.input}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="idCard"
        returnKeyType="done"
        value={idCard.value}
        style={styles.input}
        onChangeText={(text) => setidCard({ value: text, error: "" })}
        error={!!idCard.error}
        errorText={idCard.error}
      />

      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Next
      </Button>
      <View style={styles.row}>
        <Text style={styles.already}>I already have an account !</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen",{ role: "recipient" })}>
          <Text style={styles.link}>Log in</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    alignSelf:'center',
    width: '90%', // Responsive input width
    marginBottom: 15,
    backgroundColor: 'white', // Ensures clear visibility of input fields
  },
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.background, // Slightly transparent background for better readability
    borderRadius: 40,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  already: {
    fontWeight: "bold",
    color: theme.colors.ivory,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.sageGreen,
  },
  certificateContainer: {
    marginTop: 16,
  },
  certificateText: {
    fontSize: 16,
    color: 'white',
  },
});

