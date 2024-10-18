import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

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

const Register = () => {
  return (
    <SafeAreaView style={{ backgroundColor: '#FFD700' }}>
      <View style={styles.container}>
        <Text style={styles.headingtext}>Register Your Shop</Text>

        <View style={styles.imageUploadContainer}>
          <Text style={styles.text}>Upload Hotel Photos</Text>
          <TouchableOpacity style={styles.choose} onPress={handleShopChooseImage}>
            <Text style={styles.choosetext}>Choose</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageUploadContainer}>
          <Text style={styles.text}>Menu Card Photos</Text>
          <TouchableOpacity style={styles.choose} onPress={handleMenuChooseImage}>
            <Text style={styles.choosetext}>Choose</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputbox}>
          <TextInput
            placeholder='Hotel Name'
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
            placeholder='Description'
            placeholderTextColor='white'
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.regbtn}>
          <Text style={styles.regbtnText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Register;

const styles = StyleSheet.create({
  regbtn: {
    backgroundColor: '#FF3A3A',
    marginTop: 30,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  regbtnText: {
    paddingVertical: 5,
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  inputbox: {
    borderBottomWidth: 1,
    width: '90%',
    marginVertical: 10,
    borderColor: 'white',
  },
  input: {
    paddingVertical: 10,
    fontSize: 23,
    color: 'white',
  },
  choosetext: {
    fontSize: 23,
    padding: 5,
    paddingHorizontal: 20,
  },
  choose: {
    marginLeft: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  text: {
    fontSize: 23,
    color: 'white',
    flex: 1,
    textAlign: 'left', // Align text to the left
  },
  headingtext: {
    fontSize: 30,
    padding: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center', // Center align heading text
  },
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  imageUploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%', // Full width for image upload containers
    marginVertical: 10, // Space between image upload sections
  },
});
