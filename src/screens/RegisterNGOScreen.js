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
// import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import { phoneValidator } from "../helpers/phoneValidator";

export default function RegisterNGOScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  // const [email, setEmail] = useState({ value: "", error: "" });
  const [phone, setPhone] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  // Define certificate state to store selected document
  const [certificate, setCertificate] = useState(null);

  // Handle the document pick and store the result in state
  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // Specify PDF type
      });

      if (result.type === 'cancel') {
        console.log('Document picker was cancelled');
        return;
      }

      // Store the selected document details in state
      setCertificate(result);
      console.log(result); // Log the result for debugging
      setCertificate(result.assets[0]);
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    // const emailError = emailValidator(email.value);
    const phoneError = phoneValidator(phone.value);
    const passwordError = passwordValidator(password.value);
    if (phoneError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setPhone({ ...phone, error: phoneError });
      // setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{ name: "HomeScreen" }],
    });
  };

  return (
    <ImageBackground 
      source={require('../../assets/items/0d59de270836b6eafe057c8afb642e77.jpg')} // Replace with your image path
      style={styles.imageBackground}
      blurRadius={8} // Adjust the blur intensity
    >
      <BackButton goBack={navigation.goBack} />
      <View style={styles.container}>
      <Text style={styles.header}>Hello.</Text>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        style={styles.input}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />
      {/* <TextInput
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
      /> */}

      <TextInput
          label="Phone Number"
          mode="outlined"
          style={styles.input}
          value={phone.value}
          onChangeText={(text) => setPhone({ value: text, error: "" })}
          error={!!phone.error}
          errorText={phone.error}
          keyboardType="phone-pad"
        />



      <TextInput
        label="Password"
        returnKeyType="done"
        style={styles.input}
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      {/* Button to pick certificate */}
      <Button mode="contained" onPress={handleDocumentPick} style={{ marginTop: 24 }}>
        Upload Certificate
      </Button>

      {/* Display selected certificate details */}
      {certificate && (
        <View style={styles.certificateContainer}>
          <Text style={styles.certificateText}>Selected Certificate:</Text>
          <Text style={styles.certificateText}>Name: {certificate.name}</Text>
          <Text style={styles.certificateText}>URI: {certificate.uri}</Text>
        </View>
      )}

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
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.background, // Slightly transparent background for better readability
    borderRadius: 40,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.sageGreen,
    textShadowColor: theme.colors.background, // Outline color
    textShadowOffset: { width: 2, height: 2 }, // Offset for the shadow
    textShadowRadius: 1, // Spread for the shadow
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  input: {
    alignSelf:'center',
    width: '90%', // Responsive input width
    marginBottom: 15,
    backgroundColor: 'white', // Ensures clear visibility of input fields
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

