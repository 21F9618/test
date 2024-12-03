import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Formik } from 'formik';
import { Picker } from "@react-native-picker/picker";
import { theme } from "../core/theme";
import ImagePickerComponent from '../components/ImagePickerComponent';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const RecipientProfileForm = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const [image, setImage] = useState(null);

  const genderOptions = ['Male', 'Female', 'Other'];
  const maritalStatusOptions = ['Single', 'Married', 'Divorced', 'Widowed'];
  const clothingSizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const shirtSizes = ['36', '38', '40', '42', '44', '46', '48'];
  const trouserSizes = ['28', '30', '32', '34', '36', '38', '40', '42'];

  const onSubmit = (values) => {
    console.log(values);
    // Handle form submission
  };

  return (
    <View style={[styles.container, { marginBottom: tabBarHeight }]}>
      <ScrollView>
        <Text style={styles.title}>Recipient Profile</Text>
        <View style={styles.line} />

        <Formik
          initialValues={{
            name: '',
            age: '',
            gender: '',
            maritalStatus: '',
            children: '',
            occupation: '',
            income: '',
            educationLevel: '',
            institution: '',
            class: '',
            shoeSize: '',
            clothingSize: '',
            shirtSize: '',
            trouserSize: '',
            address: '',
          }}
          onSubmit={onSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
            <>
              {/* Name Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  placeholder="Enter your full name"
                  placeholderTextColor={theme.colors.ivory}
                />
              </View>

              {/* Age Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Age</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('age')}
                  onBlur={handleBlur('age')}
                  value={values.age}
                  placeholder="Enter your age"
                  placeholderTextColor={theme.colors.ivory}
                  keyboardType="numeric"
                />
              </View>

              {/* Gender Selection */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Gender</Text>
                <View style={styles.radioContainer}>
                  {genderOptions.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={styles.radioOption}
                      onPress={() => setFieldValue('gender', option)}
                    >
                      <View
                        style={[
                          styles.radioCircle,
                          values.gender === option && styles.radioSelected,
                        ]}
                      />
                      <Text style={styles.radioLabel}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
               {/* Address Input */}
               <View style={styles.inputContainer}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={styles.textArea}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                  placeholder="Enter your full address"
                  placeholderTextColor={theme.colors.ivory}
                  multiline
                  numberOfLines={3}
                />
              </View>

              {/* Marital Status Selection */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Marital Status</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={values.maritalStatus}
                    onValueChange={(itemValue) => setFieldValue('maritalStatus', itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select marital status" value="" />
                    {maritalStatusOptions.map((status) => (
                      <Picker.Item key={status} label={status} value={status} />
                    ))}
                  </Picker>
                </View>
              </View>

              {/* Children Input (Conditional) */}
              {values.maritalStatus === 'Married' && (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Number of Children</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('children')}
                    onBlur={handleBlur('children')}
                    value={values.children}
                    placeholder="Enter number of children"
                    placeholderTextColor={theme.colors.ivory}
                    keyboardType="numeric"
                  />
                </View>
              )}

              {/* Occupation Selection */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Occupation</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={values.occupation}
                    onValueChange={(itemValue) => setFieldValue('occupation', itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select occupation" value="" />
                    <Picker.Item label="Employed" value="Employed" />
                    <Picker.Item label="Unemployed" value="Unemployed" />
                    <Picker.Item label="Student" value="Student" />
                  </Picker>
                </View>
              </View>

              {/* Income Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Monthly Income</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('income')}
                  onBlur={handleBlur('income')}
                  value={values.income}
                  placeholder="Enter your monthly income"
                  placeholderTextColor={theme.colors.ivory}
                  keyboardType="numeric"
                />
              </View>

              {/* Student-specific fields (Conditional) */}
              {values.occupation === 'Student' && (
                <>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Education Level</Text>
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={values.educationLevel}
                        onValueChange={(itemValue) => setFieldValue('educationLevel', itemValue)}
                        style={styles.picker}
                      >
                        <Picker.Item label="Select education level" value="" />
                        <Picker.Item label="School" value="School" />
                        <Picker.Item label="College" value="College" />
                        <Picker.Item label="University" value="University" />
                      </Picker>
                    </View>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Institution Name</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange('institution')}
                      onBlur={handleBlur('institution')}
                      value={values.institution}
                      placeholder="Enter institution name"
                      placeholderTextColor={theme.colors.ivory}
                    />
                  </View>

                  {values.educationLevel === 'School' && (
                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Class/Standard</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={handleChange('class')}
                        onBlur={handleBlur('class')}
                        value={values.class}
                        placeholder="Enter your class or standard"
                        placeholderTextColor={theme.colors.ivory}
                      />
                    </View>
                  )}

                  {(values.educationLevel === 'College' || values.educationLevel === 'University') && (
                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Year of Study</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={handleChange('class')}
                        onBlur={handleBlur('class')}
                        value={values.class}
                        placeholder="Enter your year of study"
                        placeholderTextColor={theme.colors.ivory}
                      />
                    </View>
                  )}
                </>
              )}

              {/* Shoe Size Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Shoe Size</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('shoeSize')}
                  onBlur={handleBlur('shoeSize')}
                  value={values.shoeSize}
                  placeholder="Enter your shoe size"
                  placeholderTextColor={theme.colors.ivory}
                />
              </View>

              {/* Clothing Size Selection */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Clothing Size</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={values.clothingSize}
                    onValueChange={(itemValue) => setFieldValue('clothingSize', itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select clothing size" value="" />
                    {clothingSizes.map((size) => (
                      <Picker.Item key={size} label={size} value={size} />
                    ))}
                  </Picker>
                </View>
              </View>

              {/* Shirt Size Selection */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Shirt Size</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={values.shirtSize}
                    onValueChange={(itemValue) => setFieldValue('shirtSize', itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select shirt size" value="" />
                    {shirtSizes.map((size) => (
                      <Picker.Item key={size} label={size} value={size} />
                    ))}
                  </Picker>
                </View>
              </View>

              {/* Trouser Size Selection */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Trouser Size</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={values.trouserSize}
                    onValueChange={(itemValue) => setFieldValue('trouserSize', itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select trouser size" value="" />
                    {trouserSizes.map((size) => (
                      <Picker.Item key={size} label={size} value={size} />
                    ))}
                  </Picker>
                </View>
              </View>

              {/* Profile Picture Upload */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Profile Picture</Text>
                <ImagePickerComponent
                  maxImages={1}
                  selectedImages={image ? [image] : []}
                  onImagesChange={(images) => setImage(images[0])}
                />
              </View>

              {/* Submit Button */}
              <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Save Profile</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.charcoalBlack,
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  textArea: {
    backgroundColor: theme.colors.TaupeBlack,
    height: 80,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.colors.ivory,
    paddingHorizontal: 15,
    paddingTop: 10,
    color: theme.colors.ivory,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.ivory,
    textAlign: 'center',
    marginBottom: 20,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: theme.colors.sageGreen,
    marginVertical: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.ivory,
    marginBottom: 5,
  },
  input: {
    backgroundColor: theme.colors.TaupeBlack,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.colors.ivory,
    paddingHorizontal: 15,
    color: theme.colors.ivory,
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.sageGreen,
    marginRight: 10,
  },
  radioSelected: {
    backgroundColor: theme.colors.sageGreen,
  },
  radioLabel: {
    color: theme.colors.ivory,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: theme.colors.ivory,
    borderRadius: 10,
    overflow: 'hidden',
  },
  picker: {
    height: 40,
    color: theme.colors.ivory,
    backgroundColor: theme.colors.TaupeBlack,
  },
  submitButton: {
    backgroundColor: theme.colors.sageGreen,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20, 
  },
  submitButtonText: {
    color: theme.colors.ivory,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default RecipientProfileForm;

