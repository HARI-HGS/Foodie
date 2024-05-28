import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';

const NumberInputBox = () => {
  const [number, setNumber] = useState('+919360056558');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleChangeText = (text) => {
    setNumber(text);
  };

  const handleGenerateOtp = () => {
    // In a real-world scenario, you would send the OTP to the provided mobile number
    // For demonstration purposes, generating a random 4-digit OTP here
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    setIsOtpSent(true);
    Alert.alert('OTP Generated', `An OTP has been sent to ${number}`);
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      // OTP is correct, allow user to proceed to home page
      Alert.alert('Success', 'OTP matched! Allowing access to home page.');
      // Add navigation logic to navigate to home page here
    } else {
      Alert.alert('Error', 'OTP does not match. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Mobile Number:</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={number}
        onChangeText={handleChangeText}
        placeholder="Enter Mobile Number"
      />
      <Button title="Generate OTP" onPress={handleGenerateOtp} />
      {isOtpSent && (
        <>
          <Text style={styles.label}>Enter OTP:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={otp}
            onChangeText={setOtp}
            maxLength={4} // Assuming OTP is 4 digits
            placeholder="Enter OTP"
          />
          <Button title="Verify OTP" onPress={handleVerifyOtp} />
        </>
      )}
    </View>
  );
};

export default NumberInputBox;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 20,
  },
});
