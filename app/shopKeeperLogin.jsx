import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const shopKeeperLogin = () => {

  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userPassword, setPassword] = useState('');

  const router = useRouter();


  const validateInput = () =>{
    if(!phoneNumber || !userPassword){
    Alert.alert('Validation Error', "Please fill in all fields. ");
    return false;
   }
    return true;
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.13.207:8080/api/customer/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          password: userPassword,
        }),
      });
  
      // Log the raw response for debugging
      const rawResponse = await response.text(); // Use text() to avoid JSON parse errors if response is not JSON
      console.log('Raw response:', rawResponse);
  
      // Attempt to parse JSON only if the response is not empty
      let data;
      if (rawResponse) {
        data = JSON.parse(rawResponse);
      } else {
        throw new Error("Empty response from server");
      }
  
      if (response.ok) {
        // Handle successful login
        console.log('Login Successful:', data.message);
  
        // Store token if it exists in the response
        const token = data.token; // Check if token or other user data exists
        if (token) {
          await AsyncStorage.setItem('shopKeeperToken', token);
          await AsyncStorage.setItem('shopkeeperData', JSON.stringify({ phoneNumber }));

          router.replace('Shop/shopProfile');
          // Navigate to home screen or do other things
        } else {
          console.error('No token found in response');
        }
      } else {
        // Handle login error
        console.error('Login Error:', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter Mobile Number"
      />
      <TextInput
        style={styles.input2}
        keyboardType="default"
        value={userPassword}
        onChangeText={setPassword}
        placeholder="Enter Password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.buttonview} onPress={handleLogin}>
        <Text style={styles.button}>Login</Text>
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an Account? </Text>
        <TouchableOpacity onPress={() => router.push('customerSignUp')}>
          <Text style={styles.signupLink}>SignUp</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default shopKeeperLogin;

const styles = StyleSheet.create({
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
});

