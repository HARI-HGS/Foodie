import { StyleSheet, Text, TouchableOpacity, View,TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker'


const handleMenuChooseImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],
      quality: 1,
  });

  if (!result.canceled) {
      // Here you can do something with the selected image, such as displaying it or uploading it to a server
      console.log(result.uri);
  }
};

const handleShopChooseImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
  });

  if (!result.canceled) {
      // Here you can do something with the selected image, such as displaying it or uploading it to a server
      console.log(result.uri);
  }
};
const register = () => {

  

 

   return (
    <SafeAreaView style={{ backgroundColor: '#FFD700' }}>
      <View style={styles.container}>
        <View style={{ alignItems: 'center', backgroundColor: '#FFD700', height: '100%', width: '100%' }}>
          <Text style={styles.headingtext}>Register Your Shop</Text>

          <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 20 }}>
            <Text style={styles.text}>Upload Hotel Photos</Text>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.choose} onPress={handleShopChooseImage}>
              <Text style={styles.choosetext}>Choose</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <Text style={styles.text}>Menu Card Photos</Text>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.choose}  onPress={handleMenuChooseImage}>
              <Text style={styles.choosetext}>Choose</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputbox}>
            <TextInput
            placeholder='Hotel Nmae'
            placeholderTextColor='white'
            style={styles.input}
            />
          </View>

          <View style={styles.inputbox}>
            <TextInput
            placeholder='Contact Number'
            placeholderTextColor='white'
            style={styles.input}
            />
          </View>

          <View style={styles.inputbox}>
            <TextInput
            placeholder='Hotel Location'
            placeholderTextColor='white'
            style={styles.input}
            />
          </View>

          <View style={styles.inputbox}>
            <TextInput
            placeholder='Discription'
            placeholderTextColor='white'
            style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.regbtn}>
            <Text style={{paddingVertical:5,color:'white',fontSize:30,fontWeight:'bold'}}>Register</Text>
          </TouchableOpacity>


        </View>
      </View>
    </SafeAreaView>
  );
}

export default register;

const styles = StyleSheet.create({

  regbtn:{

  backgroundColor:'#FF3A3A',
  marginTop:30,
  width:'75%',
  alignItems:'center',
  justifyContent:'center',
  borderRadius:7
   
  },

  inputbox:{
    borderBottomWidth:1,
    width:'90%',
    margin:10,
    borderColor:'white',
    

  },

  input:{
  paddingVertical:10,
  fontSize:23,
},

  choosetext: {
    fontSize: 23,
    padding: 5,
    paddingHorizontal: 20
  },
  choose: {
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 5
  },
  text: {
    fontSize: 23,
   
    
    color: 'white'
  },
  headingtext: {
    fontSize: 30,
    padding: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop:30,
    marginBottom:20
  },
  
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    
  },
});
