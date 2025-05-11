import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Background from "../components/Background";
import Header from "../components/Header";
import ImageButton from "../components/ImageButton";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import i18n, { t } from "../i18n";

export default function ChooseRole({ navigation }) {
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />

      <View style={styles.container}>
        <Text style={styles.header}>{t("chooseRole.chooseRole")}</Text>

        <View style={styles.buttonContainer}>
          <ImageButton
            onPress={() => navigation.navigate("LoginScreen", { role: "recipient" })}
            source={require("../../assets/items/desktop-wallpaper-child-african-bl-african-kids.jpg")}
            imageStyle={styles.image}
            text={t("chooseRole.recipient")}
            textStyle={styles.buttonText}
          />

          <ImageButton
            onPress={() => navigation.navigate("LoginScreen", { role: "donor" })}
            source={require("../../assets/items/illustration-about-helping-poor-needy-with-concept-giving-charity_882884-955.jpg")}
            imageStyle={styles.image}
            text={t("chooseRole.donor")}
            textStyle={styles.buttonText}
          />

          <ImageButton
            onPress={() => navigation.navigate("LoginScreen", { role: "rider" })}
            source={require("../../assets/items/testinglogo.jpg")}
            imageStyle={styles.image}
            text={t("chooseRole.rider")}
            textStyle={styles.buttonText}
          />
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.ivory, // BLACK text
    textAlign: "center",
    marginBottom: 32,
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
  image: {
    width: 140,
    height: 130,
    borderRadius: theme.roundness * 2,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: theme.colors.sageGreen,
    shadowColor: theme.colors.outerSpace,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    fontSize: i18n.locale === "ur" ? 20 : 16,
    color: theme.colors.text,
    fontWeight: "bold",
    textAlign: "center",
  },
});
