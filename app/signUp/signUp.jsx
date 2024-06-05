import { SafeAreaView, StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const signUp = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  return (
    <SafeAreaView style={styles.container}>
       <Text style={styles.headerText}>Sign Up</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter Username"
      />
      <TextInput
        style={styles.input2}
        keyboardType="default"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter Phone number"
        secureTextEntry
      />
      <TextInput
        style={styles.input2}
        keyboardType="default"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter email id"
        secureTextEntry
      />
      <TextInput
        style={styles.input2}
        keyboardType="default"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter Password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.buttonview}>
        <Text style={styles.button}>Sign Up</Text>
      </TouchableOpacity>
     
    </SafeAreaView>
  )
}

export default signUp

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