import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
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
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeModalButton}>
            <Image style={styles.closeIcon} source={require('../../assets/icons/x.png')} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Details</Text>
          
          <View style={styles.inputbox}>
            <TextInput
              placeholder='Description'
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
          
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.pic}>
        <Image source={require('../../assets/images/profile.png')} style={styles.profileImage} />
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>HariHaran S</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.detailsText}>Obsessed with 🍫🍫🍫, Author ✍🏻 Insta Influencer 🤳 YouTube Creator 🖥️</Text>
        <Text style={styles.detailsText}>Phone Number : 9360076558</Text>
        <Text style={styles.detailsText}>Email Id : harihariharan924@gmail.com</Text>
      </View>

      <View>
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 20,
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
    fontSize: normalize(18),
    padding: 5,
    color: 'white',
  },

  pic: {
    marginTop: 20,
    width: normalize(120),
    height: normalize(120),
    borderRadius: normalize(60),
    overflow: 'hidden',
  },

  profileImage: {
    width: '100%',
    height: '100%',
  },

  nameContainer: {
    marginTop: 15,
    alignItems: 'center',
  },

  nameText: {
    fontSize: normalize(22),
    fontWeight: 'bold',
  },

  details: {
    marginTop: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  detailsText: {
    fontSize: normalize(18),
    textAlign: 'center',
    marginBottom: 10,
  },

  savedPlaces: {
    width: '100%',
    alignItems: 'center',
    borderColor: 'lightgray',
    borderTopWidth: 1,
    marginTop: 20,
    paddingVertical: 10,
  },

  savedPlacesText: {
    fontSize: normalize(20),
    fontWeight: 'bold',
  },

  scrollView: {
    width: '100%',
    marginTop: 10,
  },

  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeModalButton: {
    position: 'absolute',
    top: 10,
    right: 20,
  },

  closeIcon: {
    width: 30,
    height: 30,
  },

  modalTitle: {
    fontSize: normalize(25),
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
  },

  inputbox: {
    borderBottomWidth: 1,
    width: '90%',
    margin: 10,
    borderColor: 'black',
  },

  input: {
    paddingVertical: 10,
    fontSize: normalize(20),
  },

  submitButton: {
    backgroundColor: '#FFD700',
    margin: 30,
    width: '80%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },

  submitText: {
    fontSize: normalize(20),
    color: 'white',
  },
});
