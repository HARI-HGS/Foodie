import { Image, ScrollView, StyleSheet, Text, TextInput, View,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Link, router, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import NumberInputBox from '../components/NumberInputBox'
import { images } from '../constants/images';
import GoogleSignInButton from '../components/googlesignup'

const index = () => {

 const router = useRouter();

  const handleContinue = () =>{

    router.push('home');

  }

  const [phoneNumber, setPhoneNumber] = useState('');

  return (

    <View style = {styles.container}>
      <Text style={styles.text}>Login</Text>
      <View style={styles.inputbox}>
      <View style={styles.flag}>
        <Image style ={styles.flagimg}source={require('../assets/images/flag.jpg')}/>
      </View>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter Mobile Number"
      />
      </View>
      
      <TouchableOpacity style={styles.buttonview} onPress={handleContinue}>
          <Text style={styles.button}>Continue</Text>
      </TouchableOpacity>

        <View style={styles.separator}>
        <View style={styles.line}></View>
        <Text style={styles.separatorText}>or</Text>
        <View style={styles.line}></View>
      </View>
      <View style={styles.containerx}>
      <GoogleSignInButton />
    </View>
     </View>
     
  )
}  

export default index

const styles = StyleSheet.create({
  containerx:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderColor:'#FFFFFF',
  },
 buttonview:{
    marginTop:25,
    width:'86%',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5,
    borderWidth:1,
    padding:10,
    backgroundColor:'#FFD700',
    borderColor:'#FFD700',

 },
 separator: {
  flexDirection: 'row',
  alignItems: 'center',
  width: '80%',
  marginVertical: 20,
},
separatorText: {
  marginHorizontal: 10,
  fontSize: 16,
  color: 'gray',
},
line: {
  flex: 1,
  height: 1,
  backgroundColor: 'gray',
},
 seperators:{
  
  flexDirection:'row',
 justifyContent:'space-between'
 },
 button:{
  color:'#FFFFFF',
  fontWeight:'bold',
  fontSize:20
 },
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    fontSize:25,
    color:'#FFD700',
    fontWeight:'bold',
  },
  flag:{
    width:'14%',
    height:50,
    borderColor:'gray',
    borderWidth:1,
    borderRadius:5,
    
    alignItems:'center',
    justifyContent:'center',
    padding:1
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft:10,
    borderRadius:5,
    padding:6,
    paddingLeft:20,
    width:'70%',
},
  inputbox:{
  flexDirection:'row',
  justifyContent:'space-between',
  marginTop:10,
  },
  flagimg:{
    width:'90%',
    height:'80%',
    
    borderRadius:5,
  
  
  },
 
})