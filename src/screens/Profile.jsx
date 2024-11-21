import { View, Text, TextInput } from 'react-native'
import React, { useRef } from 'react'
import { theme } from "../core/theme";


const Profile = () => {
  
  return (
    <View>
      <TextInput
          label="Password"
          mode="outlined"
          keyboardType="default"
          style={{backgroundColor:theme.colors.sageGreen, paddingTop:100}}
        />
    </View>
  )
}

export default Profile