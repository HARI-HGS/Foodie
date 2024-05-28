import { SafeAreaView, StyleSheet, Text, View ,Image, ScrollView} from 'react-native'
import React from 'react'
import { Dimensions, Platform, PixelRatio } from 'react-native';
import FavComponent from '../../components/FavComponent';

// Get the device's width and height
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Based on iPhone 8's scale
const scale = SCREEN_WIDTH / 375;

const normalize = (size) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};
const profile = () => {
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.pic}>
    <Image source={require('../../assets/images/profile.png')} style={{width:'100%',height:'100%',borderRadius:100}} />
    </View>
    <View style={styles.name}>
      <Text style={styles.text} >HariHaran S</Text>
    </View>
    <View style={styles.details}>
    <Text style={styles.text}>Obsessed with 🍫🍫🍫, Author ✍🏻 Insta Influencer 🤳 YouTube Creator 🖥️</Text> 
    <Text style={styles.text}>Phone Number : 9360076558</Text>
    <Text style={styles.text}>Email Id : harihariharan924@gmail.com</Text>
    </View>
    <View style={{width:'100%',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'lightgray',position:'absolute',top:350}}>
    <Text style={{fontSize:normalize(25),paddingHorizontal:20,paddingVertical:5,fontWeight:'bold'}}> Saved Places </Text>
    </View>
    <ScrollView style={{width:'100%',height:430,position:'absolute',bottom:0}}>
    <FavComponent/>
    </ScrollView>
   </SafeAreaView>
  )
}

export default profile

const styles = StyleSheet.create({
  fav:{
   
    width:'95%',
    
    backgroundColor:'ligthpink'

  },
  details:{
   position:'absolute',
   top:230,
   width:'97%',
   height:"15%",
   borderRadius:10,
   
   
  
  },

  text:{

    fontSize:normalize(20),
    paddingHorizontal:10,
    paddingVertical:5

  },

  name:{
  
    position:'absolute',
    top:180,
    padding:10,
    


  },
  pic:{
   position:'absolute',
   top:60,
   width:'31%',
   height:'15%',
   
   borderRadius:100

  },
    container: {
        flex: 1,
        backgroundColor:'white',
        alignItems: 'center',
        justifyContent: 'center',
      },
}) 