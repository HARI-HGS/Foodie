import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';


const UserLogin = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userPassword, setPassword] = useState('');

  const router = useRouter();


// Validate input fields before login
  const validateInput = () => {
    if (!phoneNumber || !userPassword) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.13.207:8080/api/auth/login', {
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
          await AsyncStorage.setItem('userToken', token);
          await AsyncStorage.setItem('userData', JSON.stringify({ phoneNumber }));

          router.replace('home');
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
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        keyboardType="default"
        value={userPassword}
        onChangeText={setPassword}
        placeholder="Enter Password"
        secureTextEntry
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.buttonview} onPress={handleLogin}>
        <Text style={styles.button}>Login</Text>
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an Account? </Text>
        <TouchableOpacity onPress={() => router.push('signUp/signUp')}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    width: '85%',
    marginTop: 10,
    backgroundColor: '#fff',
  },
  buttonview: {
    marginTop: 20,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  button: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  signupText: {
    fontSize: 16,
  },
  signupLink: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});
