import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View, ImageBackground, Dimensions } from "react-native";
import { Text, Button } from "react-native-paper";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
// import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { phoneValidator } from "../helpers/phoneValidator";
const screenWidth = Dimensions.get('window').width;

export default function LoginScreen({ navigation, route }) {
  // const [email, setEmail] = useState({ value: "", error: "" });
  const [phone, setPhone] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const { role } = route.params;
  const onLoginPressed = async() => {
    const phoneError = phoneValidator(phone.value);
    // const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    // if (emailError || passwordError) {
    //   setEmail({ ...email, error: emailError });
    //   setPassword({ ...password, error: passwordError });
    //   return;
    // }
 
    navigation.replace("TabNavigator");
  };

  const navigateToRegister = () => {
    if (role === "recipient") {
      navigation.navigate("RChoose");
    } else if (role === "donor") {
      navigation.navigate("RegisterScreenDonor");
    } else {
      navigation.navigate("ScheduleRDeliveryScreen"); // Optional: for other roles
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/items/0d59de270836b6eafe057c8afb642e77.jpg')} // Replace with your image path
      style={styles.imageBackground}
      blurRadius={8} // Adjust the blur intensity
    >
      <View style={styles.backButtonWrapper}>
        <BackButton goBack={navigation.goBack} />
      </View>
      
      {/* <BackButton goBack={navigation.goBack} /> */}
      <View style={styles.container}>
      
        
        <Text style={styles.header}>Hello.</Text>
        
        {/* <TextInput
          label="Email"
          mode="outlined"
          style={styles.input}
          value={email.value}
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
          mode="outlined"
          style={styles.input}
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        
        <TouchableOpacity onPress={() => navigation.navigate("ResetPasswordScreen")}>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>
        
        <Button mode="contained" onPress={onLoginPressed} style={styles.button}>
          Log in
        </Button>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account yet?</Text>
          <TouchableOpacity onPress={navigateToRegister}>
            <Text style={styles.link}>Create one!</Text>
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
    backgroundColor: theme.colors.background, //'rgba(255, 255, 255, 0.65)', // Slightly transparent background for better readability
    borderRadius: 30,
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
  input: {
    alignSelf:'center',
    width: '90%', // Responsive input width
    marginBottom: 15,
    backgroundColor: 'white', // Ensures clear visibility of input fields
  },
  forgotPassword: {
    fontSize: 13,
    color: theme.colors.ivory,
    marginTop: -10,
    marginBottom: 20,
  },
  button: {
    width: '90%', // Responsive button width
    paddingVertical: 8,
    borderRadius: 25,
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: theme.colors.ivory,
  },
  link: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.colors.sageGreen,
    marginLeft: 5,
  },
  backButtonWrapper: {
    position: 'absolute',
    top: 10, 
    left: 30, 
    padding: 10, 
  },
});
