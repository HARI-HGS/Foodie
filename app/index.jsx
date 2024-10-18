import { Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, PixelRatio } from 'react-native';
import React, { useState } from 'react';
import { Link, router, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import NumberInputBox from '../components/NumberInputBox';
import { images } from '../constants/images';
import GoogleSignInButton from '../components/googlesignup';

const Index = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.push('home');
  };

  const [phoneNumber, setPhoneNumber] = useState('');

  // Get the font scale factor
  const fontScale = PixelRatio.getFontScale();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={[styles.loginText, { fontSize: 24 * fontScale }]}>Login</Text>
        <View style={styles.logoContainer}>
          <TouchableOpacity style={styles.logo}onPress={()=> router.push('userLogin')}>
            <Image style={styles.img} source={require('../assets/icons/logoprofile.jpg')} />
            <Text style={[styles.text, { fontSize: 16 * fontScale }]}>User Profile</Text>  
          </TouchableOpacity>
          <TouchableOpacity style={styles.logo} onPress={()=> router.push('shopKeeperLogin')}>
            <Image style={styles.img} source={require('../assets/icons/logoprofile.jpg')}/>
            <Text style={[styles.text, { fontSize: 16 * fontScale }]}>Shop Keeper</Text>
          </TouchableOpacity>
        </View>     
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    
    backgroundColor:'#FFD700'
  },

  img: {
    width: "100%", // Adjusts to the width of the logo container
    height: 80, // Keeps the image size consistent
    marginBottom: 10, // Spacing between image and text
    resizeMode: 'contain', // Ensures the image is not cropped and fits within the container
    borderRadius: 15, // Slightly rounds the corners of the image
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginText: {
    marginBottom: 35,
    textAlign: 'center',
    color:'white',
   
  },

  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: 20,
  },

  logo: {
    width: '30%', // Adjusts the logo box to take up 30% of the screen width
    padding: 5, // Adjusts padding for better spacing
    borderRadius: 10,
    borderStyle: 'solid',
    alignItems: 'center',
  },

  text: {
    textAlign: 'center',
  },
});
