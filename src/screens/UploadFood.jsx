import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { theme } from "../core/theme";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Formik } from 'formik';
import CircleLogoStepper from '../components/CircleLogoStepper';

const UploadFood = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const mealOptions = ['Breakfast', 'Brunch', 'Lunch', 'Dinner'];
  const [isFocused, setIsFocused] = useState(false);


  return (
    <View style={[Styles.container, { marginBottom: tabBarHeight }]}>
      <ScrollView>
        <CircleLogoStepper></CircleLogoStepper>
        <View style={Styles.line} />

        
        {/* Form */}
        <Formik
          initialValues={{ desc: '', selectedMeal: '', quantity: 1 , name:''}}
          onSubmit={(values) => console.log(values)}
          style={{height:'100%'}}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
            <>
              {/* Meal Time Selection */}
              <View style={{marginTop:30}} >
                <Text style={Styles.headings}>Meal</Text>
              <View style={Styles.mealContainer}>
                
                {mealOptions.map((meal) => (
                  <TouchableOpacity
                    key={meal}
                    style={[
                      Styles.mealButton,
                      values.selectedMeal === meal && Styles.selectedMealButton
                    ]}
                    onPress={() => setFieldValue('selectedMeal', meal)}
                  >
                    <Text style={Styles.mealButtonText}>{meal}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              </View>
              <View style={{marginTop:20}}>
                <Text style={Styles.headings}>Food Name</Text>
              <TextInput placeholder="Rice"
                onChangeText={handleChange('name')}
                value={values.name}
                style={Styles.name}
                mode='outlined'
                underlineColor="transparent"
                placeholderTextColor={theme.colors.ivory}

                selectionColor={theme.colors.sageGreen}
                >
             
              </TextInput>
              </View>
              <View style={{marginTop:20}}>
                <Text style={Styles.headings}>Description</Text>
              <TextInput placeholder="Enter description here.."
                onChangeText={handleChange('desc')}
                value={values.desc}
                style={Styles.descri}
                mode='outlined'
                underlineColor="transparent"
                placeholderTextColor={theme.colors.ivory}

                selectionColor={theme.colors.sageGreen}
                >
             
              </TextInput>
              </View>
             

              {/* Quantity Selector */}
              <View style={{marginTop:20}}>
              <Text style={Styles.headings}>
                  Servings
                </Text>
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

              {/* Submit Button */}
              <View style={{alignItems:'center'}}>
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
    padding:10,
    paddingTop:30,
  },
  mealContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  mealButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.sageGreen,
    borderRadius: 5,
    width: '22%',
    alignItems: 'center',
  },
  selectedMealButton: {
    backgroundColor: theme.colors.sageGreen,
  },
  mealButtonText: {
    color: theme.colors.ivory,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    padding:20,
    borderRadius:10,
    borderColor:theme.colors.sageGreen,
    borderWidth:1
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
    width:'90%'
  },
  submitButtonText: {
    color: theme.colors.ivory,
    fontWeight: 'bold',
    fontSize:18
  },
  descri:{
    backgroundColor:theme.colors.TaupeBlack,
    height:150,
    borderWidth:1,
    borderRadius:10,
    borderColor:theme.colors.ivory,
    paddingHorizontal:17,
    color:theme.colors.ivory,
    fontSize:16,
    placeholderTextColor:'white',
    marginTop:10
  },
  name:{
    backgroundColor:theme.colors.TaupeBlack,
    height:40,
    borderWidth:1,
    borderRadius:10,
    borderColor:theme.colors.ivory,
    paddingHorizontal:17,
    color:theme.colors.ivory,
    fontSize:16,
    placeholderTextColor:'white',
    marginTop:10
  },
  headings:{
    color:theme.colors.ivory,
    fontSize:22,
    fontWeight:'bold'
  },
  line: {
    width: '100%',  // Full width of the screen or container
    height: 1,      // Thickness of the line
    backgroundColor: theme.colors.sageGreen,  // Color of the line (black)
    marginVertical: 5, // Spacing above and below the line
  },
});

export default UploadFood;
