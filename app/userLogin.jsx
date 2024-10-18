import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const userLogin = () => {

  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

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
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter Password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.buttonview} onPress={()=> router.push('home')}>
        <Text style={styles.button}>Login</Text>
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an Account? </Text>
        <TouchableOpacity onPress={() => router.push('signUp/signUp')}>
          <Text style={styles.signupLink}>SignUp</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default userLogin;

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

