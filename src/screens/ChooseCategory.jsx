import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, ImageBackground } from "react-native";
import { theme } from "../core/theme";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';


const ChooseCategory = ({ navigation }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const tabBarHeight = useBottomTabBarHeight();



  return (
    <SafeAreaView style={[styles.safeContainer, {marginBottom:tabBarHeight}]}>
      {/* Background Image */}
      <ImageBackground
        source={require("../../assets/items/rec_bg.jpg")}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Available Donations</Text>

          {/* Education Category */}
          <TouchableOpacity
            style={[styles.categoryBox, hoveredCategory === 'education' && styles.categoryBoxHovered]}
            onPress={() => navigation.navigate("UploadEdu")}
            onMouseEnter={() => setHoveredCategory('education')}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <Text style={styles.categoryText}>Education</Text>
          </TouchableOpacity>

          {/* Food Category */}
          <TouchableOpacity
            style={[styles.categoryBox, hoveredCategory === 'food' && styles.categoryBoxHovered]}
            onPress={() => navigation.navigate("UploadFood")}
            onMouseEnter={() => setHoveredCategory('food')}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <Text style={styles.categoryText}>Food</Text>
          </TouchableOpacity>

          {/* Clothing Category */}
          <TouchableOpacity
            style={[styles.categoryBox, hoveredCategory === 'clothes' && styles.categoryBoxHovered]}
            onPress={() => navigation.navigate("UploadClothes")}
            onMouseEnter={() => setHoveredCategory('clothes')}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <Text style={styles.categoryText}>Clothing</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    paddingVertical: 20,
    marginTop:30
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: theme.colors.charcoalBlack, // Darker shade for title
    textAlign: "center",
  },
  categoryBox: {
    width: "90%",
    backgroundColor: "transparent", // Transparent background
    paddingVertical: 25,
    borderRadius: 15,
    marginVertical: 15,
    borderWidth: 2,
    borderColor: theme.colors.sageGreen, // Border color set to Sage Green
    shadowColor: theme.colors.sageGreen, // Shadow color set to Sage Green
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.3s ease-in-out", // Smooth transition for hover effect
  },
  categoryBoxHovered: {
    backgroundColor: theme.colors.sageGreen, // Hover background color
    borderColor: theme.colors.charcoalBlack, // Change border color on hover
  },
  categoryText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF", // Set text color to white
    textAlign: "center",
  },
});

export default ChooseCategory;