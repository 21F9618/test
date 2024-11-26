import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Image } from 'react-native';
import { theme } from "../core/theme";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Formik } from 'formik';
import CircleLogoStepper from '../components/CircleLogoStepper';
import RowOptionButtons from '../components/RowOptionButtons';

import ImagePickerComponent from '../components/ImagePickerComponent'; // Import the new component


const UploadFood = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const mealOptions = ['Breakfast', 'Brunch', 'Lunch', 'Dinner'];
  const [images, setImages] = useState([]);

  
  const foodOptions = ['Raw', 'Cooked', 'Packaged'];


  const onSubmitMethod = (value) => {
    value.image = images;
    console.log(value);
  };

  return (
    <View style={[Styles.container, { marginBottom: tabBarHeight }]}>
      <ScrollView>
        <CircleLogoStepper />
        <View style={Styles.line} />

        {/* Form */}
        <Formik
          initialValues={{ desc: '', selectedMeal: '', quantity: 1, name: '' }}
          onSubmit={value => onSubmitMethod(value)}
          style={{ height: '100%' }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
            <>
                {/* Meal Time Selection */}
                <RowOptionButtons
  heading="Meal"
  options={mealOptions}
  selectedValue={values.selectedMeal}
  onSelect={(selectedMeal) => setFieldValue('selectedMeal', selectedMeal)}
/>


              {/* Food Name */}
              <View style={{ marginTop: 30 }}>
                <Text style={Styles.headings}>Food Name</Text>
                <TextInput
                  placeholder="Rice"
                  onChangeText={handleChange('name')}
                  value={values.name}
                  style={Styles.name}
                  placeholderTextColor={theme.colors.ivory}
                  selectionColor={theme.colors.sageGreen}
                />
              </View>

              <View style={{ marginTop: 30 }}>
  <Text style={Styles.headings}>Food Type</Text>
  <View style={Styles.radioContainer}>
    {foodOptions.map((option) => (
      <TouchableOpacity
        key={option}
        style={Styles.radioOption}
        onPress={() => setFieldValue('foodType', option)} // Update the selected food type
      >
        <View
          style={[
            Styles.radioCircle,
            values.foodType === option && Styles.radioSelected,
          ]}
        />
        <Text style={Styles.radioLabel}>{option}</Text>
      </TouchableOpacity>
    ))}
  </View>
</View>

             

              {/* Quantity Selector */}
              <View style={{ marginTop: 30 }}>
                <Text style={Styles.headings}>Servings</Text>
                <View style={Styles.quantityContainer}>
                  <Text style={Styles.quantityLabel}>Number of People:</Text>
                  <TouchableOpacity
                    onPress={() => setFieldValue('quantity', Math.max(values.quantity - 1, 1))}
                    style={Styles.quantityButton}
                  >
                    <Text style={Styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={Styles.quantityText}>{values.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => setFieldValue('quantity', values.quantity + 1)}
                    style={Styles.quantityButton}
                  >
                    <Text style={Styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
               {/* Description */}
               <View style={{ marginTop: 30 }}>
                <Text style={Styles.headings}>Description</Text>
                <TextInput
                  placeholder="Enter description here.."
                  onChangeText={handleChange('desc')}
                  value={values.desc}
                  style={Styles.descri}
                  placeholderTextColor={theme.colors.ivory}
                  selectionColor={theme.colors.sageGreen}
                />
              </View>

              {/* Image Selection */}
              <ImagePickerComponent
                maxImages={3}
                selectedImages={values.images}
                onImagesChange={(updatedImages) => setFieldValue('images', updatedImages)}
              />

              {/* Submit Button */}
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={handleSubmit} style={Styles.submitButton}>
                  <Text style={Styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.charcoalBlack,
    flex: 1,
    padding: 10,
    paddingTop: 30,
    
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
    borderColor: theme.colors.sageGreen,
    borderWidth: 1,
  },
  quantityLabel: {
    color: theme.colors.ivory,
    fontSize: 16,
    marginRight: 10,
  },
  quantityButton: {
    backgroundColor: theme.colors.sageGreen,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityButtonText: {
    color: theme.colors.ivory,
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    color: theme.colors.ivory,
    fontSize: 15,
  },
  submitButton: {
    backgroundColor: theme.colors.sageGreen,
    padding: 10,
    marginTop: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: '90%',
  },
  submitButtonText: {
    color: theme.colors.ivory,
    fontWeight: 'bold',
    fontSize: 18,
  },
  descri: {
    backgroundColor: theme.colors.TaupeBlack,
    height: 150,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.colors.ivory,
    paddingHorizontal: 17,
    color: theme.colors.ivory,
    fontSize: 16,
    textAlignVertical: 'top',
    paddingTop:15
  },
  name: {
    backgroundColor: theme.colors.TaupeBlack,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.colors.ivory,
    paddingHorizontal: 17,
    color: theme.colors.ivory,
    fontSize: 16,
    marginTop: 10,
  },
  headings: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.ivory,
  },
 
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10, // Makes it circular
    borderWidth: 2,
    borderColor: theme.colors.sageGreen,
    marginRight: 10,
  },
  radioSelected: {
    backgroundColor: theme.colors.sageGreen, // Fill the circle when selected
    borderColor: theme.colors.sageGreen,
  },
  radioLabel: {
    color: theme.colors.ivory,
    fontSize: 16,
  },
  
});
export default UploadFood;
