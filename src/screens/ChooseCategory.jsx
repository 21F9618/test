import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const ChooseCategory = ({ navigation }) => {
  return (
    <TouchableOpacity
    onPress={()=>navigation.navigate("UploadFood")} I
    style={{
    height:250,
    elevation:2,
    backgroundColor: "#FFF",
    marginLeft:20,
    marginTop:20,
    borderRadius:20,
    width:160, 

    }}
    ></TouchableOpacity>
  )
}

export default ChooseCategory