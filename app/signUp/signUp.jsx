import { Alert, SafeAreaView, StyleSheet, Text,TextInput,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';


const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');

  const router = useRouter();

  // Validate input fields before sign up
  const validateInput = () => {
    if (!phoneNumber || !userName || !userEmail || !userPassword) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateInput()) return; // Validate input before proceeding

    try {
      const response = await fetch('http://192.168.13.207:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          username: userName,
          email: userEmail,
          password: userPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Check if token is returned in response
        if (data.token) {
          // Save token to local storage
          await AsyncStorage.setItem('userToken', data.token); // Store user token

          console.log('Sign Up Successful:', data);
          Alert.alert('Success', data.message || 'Sign up successful!');
          router.push('userLogin')

          // Optionally navigate to home or login screen
          // e.g., router.push('/login') or some navigation logic here
        } else {
          Alert.alert('Sign Up Error', 'No token received. Please try again.');
        }
      } else {
        // Handle backend errors
        Alert.alert('Sign Up Error', data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      Alert.alert('Error', 'An error occurred during sign-up. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Sign Up</Text>
      <TextInput
        style={styles.input}
        value={userName}
        onChangeText={setUserName}
        placeholder="Enter Username"
      />
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter Phone Number"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        value={userEmail}
        onChangeText={setEmail}
        placeholder="Enter Email ID"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={userPassword}
        onChangeText={setPassword}
        placeholder="Enter Password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.buttonview} onPress={handleSignUp}>
        <Text style={styles.button}>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({

  container:{
   flex:1,
   alignItems:'center',
   justifyContent:'center'

  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'#FFD700'
  },
  input2: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 6,
    paddingLeft: 20,
    width: '85%',
    marginTop: 20,
  },
  button: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonview: {
    marginTop: 25,
    width: '86%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 6,
    paddingLeft: 20,
    width: '85%',
    marginTop: 30,
    marginBottom: 0,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  signupText: {
    fontSize: 16,
  },
  signupLink: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  

})