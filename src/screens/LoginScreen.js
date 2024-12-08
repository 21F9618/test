import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import React, { useState, useContext } from "react";
import { TouchableOpacity, StyleSheet, View, ImageBackground, Dimensions } from "react-native";
import { Text, Button } from "react-native-paper";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { AuthContext } from "../context/AuthContext";
import CryptoJS from "crypto-js";

const screenWidth = Dimensions.get('window').width;

export default function LoginScreen({ navigation, route }) {
  const [input, setInput] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const { role } = route.params;  // Capture the role passed from previous screen
  const { setUser } = useContext(AuthContext); // Access setUser from AuthContext
  const [isNGOFound, setIsNGOFound] = useState(false);
  let collectionFound="";

  // Helper function to get the relevant collection names based on role
  const getDatabaseCollections = (role) => {
    if (role === 'donor') return ['users'];
    if (role === 'rider') return ['riders'];
    if (role === 'recipient') return ['recipients', 'ngos']; // Recipient checks both 'recipients' and 'ngos'
    return [];
  };

  async function validateUser(inputValue, passwordInput) {
    try {
      const collections = getDatabaseCollections(role);
      let userDoc = null;
      
      // Loop through collections to query for the user
      for (let db of collections) {
        let usersRef = firestore().collection(db);

        // Query for the username
        let usernameQuerySnapshot = await usersRef
          .where("username", "==", inputValue)
          .get();

        // Query for the phone number
        let phoneNumberQuerySnapshot = await usersRef
          .where("phone", "==", inputValue)
          .get();

        if (!usernameQuerySnapshot.empty || !phoneNumberQuerySnapshot.empty) {
          userDoc = usernameQuerySnapshot.empty
            ? phoneNumberQuerySnapshot.docs[0]
            : usernameQuerySnapshot.docs[0];
          collectionFound=db;
          break; // Exit loop once user is found
        }
      }

      if (userDoc) {
        const userData = userDoc.data();
        const hashedEnteredPassword = CryptoJS.SHA256(passwordInput).toString();

        // Verify password
        if (userData.password === hashedEnteredPassword) {
          setUser(userData);
          return { success: true, message: "Login successful!" };
        } else {
          setPassword({ ...password, error: "Incorrect password" });
          return { success: false, message: "Invalid password" };
        }
      } else {
        setInput({ ...input, error: "User not found" });
        return { success: false, message: "User not found" };
      }
    } catch (error) {
      console.log("Error checking username/phone number:", error);
      return { success: false, message: "An error occurred during login" };
    }
  }

  const LoginInPressed = async () => {
    if (!input.value || !password.value) {
      if (!input.value) setInput({ ...input, error: "This field is required." });
      if (!password.value) setPassword({ ...password, error: "This field is required." });
      return;
    }

    validateUser(input.value, password.value).then((result) => {
      if (result.success) {
        if (role === 'donor') {
          navigation.navigate("TabNavigator", { role: "donor" });
          navigation.navigate("ItemDetail", { role: "donor", item: itemData });
          navigation.navigate("Clothes", { role: "donor" });
          navigation.navigate("Food", { role: "donor" });
          navigation.navigate("Education", { role: "donor" });

        } else if (role === 'recipient') {
          // Handle recipient's navigation after checking NGO status
          if (collectionFound==="ngos") {
            navigation.navigate("TabNavigator", { role: "recipient", type: "ngo" });
            // navigation.navigate("HomeScreenRec", { role: "recipient", type: "ngo" });

          } else if (collectionFound==='recipients') {
            navigation.navigate("TabNavigator", { role: "recipient", type: "individual" });
          }
        } else if (role === 'rider') {
          navigation.navigate("TabNavigator", { role: "rider" });
        }
      }
    });
  };

  const navigateToRegister = () => {
    if (role === "recipient") {
      navigation.navigate("RChoose");
    } else if (role === "donor") {
      navigation.navigate("RegisterScreenDonor");
    } else {
      navigation.navigate("RChoose"); // Optional: for other roles
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/items/0d59de270836b6eafe057c8afb642e77.jpg')}
      style={styles.imageBackground}
      blurRadius={8}
    >
      <View style={styles.backButtonWrapper}>
        <BackButton goBack={navigation.goBack} />
      </View>

      <View style={styles.container}>
        <Text style={styles.header}>Hello.</Text>
        <View style={styles.inputContainer}>
          <TextInput
            label="Username / Phone Number"
            mode="outlined"
            style={styles.input}
            value={input.value}
            onChangeText={(text) => setInput({ value: text, error: "" })}
            error={!!input.error}
            errorText={input.error ? <Text style={styles.errorText}>{input.error}</Text> : null}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="Password"
            mode="outlined"
            style={styles.input}
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: "" })}
            error={!!password.error}
            errorText={password.error ? <Text style={styles.errorText}>{password.error}</Text> : null}
            secureTextEntry
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("ResetPasswordScreen")}>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>

        <Button mode="contained" onPress={LoginInPressed} style={styles.button}>
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
    backgroundColor: theme.colors.background,
    borderRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.sageGreen,
    textShadowColor: theme.colors.background,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  input: {
    alignSelf: 'center',
    width: '100%',
    marginBottom: 3,
    backgroundColor: 'white',
  },
  forgotPassword: {
    fontSize: 13,
    color: theme.colors.ivory,
    marginTop: -10,
    marginBottom: 20,
  },
  button: {
    width: '90%',
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
  errorText: {
    fontSize: 13,
    marginTop: -5,
  },
  inputContainer: {
    width: '90%',
    marginBottom: 10,
  },
});
