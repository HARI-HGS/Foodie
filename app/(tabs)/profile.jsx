import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Modal,TextInput } from 'react-native';
import React, { useState } from 'react';
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

const Profile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.editButton}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity onPress={() => setIsModalVisible(false)} style={{position:"absolute",top:10,right:20}}>
          <Image style={{width:30,height:20}} source={require('../../assets/icons/x.png')}/>
          </TouchableOpacity>
          <Text style={{marginBottom:20,fontSize:25,fontWeight:'bold',marginTop:50}}>Details</Text>
       
        <View style={styles.inputbox}>
            <TextInput
            placeholder='Discription'
            placeholderTextColor='black'
            style={styles.input}
            />
          </View>

          <View style={styles.inputbox}>
            <TextInput
            placeholder='Phone Number'
            placeholderTextColor='black'
            style={styles.input}
            />
          </View>

          <View style={styles.inputbox}>
            <TextInput
            placeholder='Email id'
            placeholderTextColor='black'
            style={styles.input}
            />
          </View>
          
          <View style={{backgroundColor:'#FFD700',margin:30,width:'80%',alignItems:'center',padding:10,borderRadius:5}}>
            <Text style={{fontSize:20,color:'white'}}>Submit</Text>
          </View>
          
          </View>
      </Modal>
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <View style={styles.pic}>
        <Image source={require('../../assets/images/profile.png')} style={styles.profileImage} />
      </View>
      <View style={styles.name}>
        <Text style={styles.text}>HariHaran S</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.text}>Obsessed with 🍫🍫🍫, Author ✍🏻 Insta Influencer 🤳 YouTube Creator 🖥️</Text>
        <Text style={styles.text}>Phone Number : 9360076558</Text>
        <Text style={styles.text}>Email Id : harihariharan924@gmail.com</Text>
      </View>
      <View style={styles.savedPlaces}>
        <Text style={styles.savedPlacesText}>Saved Places</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <FavComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({

  inputbox:{
    borderBottomWidth:1,
    width:'90%',
    margin:10,
    borderColor:'black'
    

  },

  input:{
  paddingVertical:10,
  fontSize:23,
  
},

  choosetext: {
    fontSize: 23,
    padding: 5,
    paddingHorizontal: 20
  },
  choose: {
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 5
  },
  text: {
    fontSize: 23,
   
    
  
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    paddingHorizontal: 20,
    backgroundColor: '#FFD700',
    position: 'absolute',
    top: 55,
    left: 20,
    borderRadius: 5,
  },
  logoutButton: {
    paddingHorizontal: 10,
    backgroundColor: '#FFD700',
    position: 'absolute',
    top: 55,
    right: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    padding: 5,
    color: 'white',
  },
  modalContent: {
    backgroundColor: 'lightpink',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pic: {
    position: 'absolute',
    top: 60,
    width: '31%',
    height: '15%',
    borderRadius: 100,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  name: {
    position: 'absolute',
    top: 180,
    padding: 10,
  },
  details: {
    position: 'absolute',
    top: 230,
    width: '97%',
    height: '15%',
    borderRadius: 10,
  },
  text: {
    fontSize: normalize(20),
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  savedPlaces: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    position: 'absolute',
    top: 350,
  },
  savedPlacesText: {
    fontSize: normalize(25),
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontWeight: 'bold',
  },
  scrollView: {
    width: '100%',
    height: 430,
    position: 'absolute',
    bottom: 0,
  },
});
