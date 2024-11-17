import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Modal, TextInput, ScrollView, Image, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import FavComponent from '../../../Foodie-3/components/FavComponent';
import { Dimensions, Platform, PixelRatio } from 'react-native';

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
  const [userData, setUserData] = useState(null);
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const router = useRouter();
  const API_BASE_URL = 'http://192.168.13.207:8080/api/auth';

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token);

        if (!token) return;

        const storedUserData = JSON.parse(await AsyncStorage.getItem('userData'));
        const phoneNumber = storedUserData?.phoneNumber;

        if (!phoneNumber) return;

        const response = await fetch(`${API_BASE_URL}/${phoneNumber}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
          setDescription(data.user.description || '');
          setProfileImage(
            data.user.profileImage
              ? `${API_BASE_URL}/image/${data.user.profileImage}`
              : null
          );
        } else {
          console.error('Failed to fetch user data:', await response.text());
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  // Handle profile update
  const handleEdit = async () => {
    if (!userToken || !userData) return;

    const formData = new FormData();
    formData.append('description', description);
    if (profileImage) {
      formData.append('profileImage', {
        uri: profileImage,
        name: profileImage.split('/').pop(),
        type: 'image/jpeg',
      });
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${userData.phoneNumber}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: 'application/json',
        },
        body: formData,
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(updatedUser.user);
        setIsModalVisible(false);
        Alert.alert('Success', 'Profile updated successfully!');
      } else {
        console.error('Error updating profile:', await response.text());
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      Alert.alert('Logout', 'Are you sure you want to logout?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => router.push('userLogin') },
      ]);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Pick image from gallery
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Camera roll access is needed to select a profile image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Edit Button */}
      <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.editButton}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>

      {/* Edit Profile Modal */}
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeModalButton}>
            <Text>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Edit Profile</Text>
          <TextInput
            placeholder="Description"
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
          <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
            <Text style={styles.imagePickerText}>Pick Image</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEdit} style={styles.submitButton}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      {/* Profile Image */}
      <TouchableOpacity onPress={pickImage} style={styles.pic}>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require('../../assets/images/profile.png') // Default image
          }
          style={styles.profileImage}
        />
      </TouchableOpacity>

      {/* User Details */}
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{userData?.username || 'User Name'}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detailsText}>{description || 'No description available.'}</Text>
        <Text style={styles.detailsText}>Phone: {userData?.phoneNumber}</Text>
        <Text style={styles.detailsText}>Email: {userData?.email}</Text>
      </View>

      {/* Saved Places */}
      <Text style={styles.savedPlacesText}>Saved Places</Text>
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
