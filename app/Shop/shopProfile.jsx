import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Platform, PixelRatio, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 375;

const normalize = (size) => {
  const newSize = size * scale;
  return Platform.OS === 'ios' ? 
    Math.round(PixelRatio.roundToNearestPixel(newSize)) : 
    Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

const ShopProfile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [shopStatus, setShopStatus] = useState('Open');
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const router = useRouter();

  const handleEdit = async () => {
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
      const response = await fetch(`http://192.168.13.207:8080/api/customer/${userData.phoneNumber}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Accept': 'application/json',
        },
        body: formData,
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(updatedUser);
        setIsModalVisible(false);
        Alert.alert("Success", "Profile updated successfully");
      } else {
        console.error("Error updating user:", await response.text());
        Alert.alert("Error", "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserToken = await AsyncStorage.getItem('shopKeeperToken');
        setUserToken(storedUserToken);
        if (!storedUserToken) return;

        const storedUserData = JSON.parse(await AsyncStorage.getItem('shopkeeperData'));
        const phoneNumber = storedUserData ? storedUserData.phoneNumber : null;
        if (!phoneNumber) return;

        const response = await fetch(`http://192.168.13.207:8080/api/customer/${phoneNumber}`, {
          headers: {
            'Authorization': `Bearer ${storedUserToken}`,
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
          setDescription(data.user.description || '');
          setProfileImage(data.user.profileImage || null);
        } else {
          console.error("Failed to fetch user data:", await response.text());
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.headerText}>Shop Keeper</Text>
        <View style={styles.pic}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={profileImage ? { uri: profileImage } : require('../../assets/images/profile.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>{userData?.username}</Text>
          <Text style={styles.detailText}>Phone: {userData?.phoneNumber}</Text>
          <Text style={styles.detailText}>Email: {userData?.email}</Text>
          <Text style={styles.detailText}>
            Shop Status: <Text style={[styles.activeText, { color: shopStatus === 'Open' ? 'green' : 'red' }]}>{shopStatus}</Text>
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={() => router.push('adsCollection')}>
            <Text style={styles.buttonText}>Add Ads</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton2}>
            <Text style={styles.buttonText}>Your Shop</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => setShopStatus('Open')}>
          <Text style={styles.bottomText}>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShopStatus('Close')}>
          <Text style={styles.bottomText}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('register')}>
          <Text style={styles.bottomText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ShopProfile;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20, // Add padding for better spacing
  },
  topContainer: {
    alignItems: 'center',
    marginTop: 50, // Adjusted for more responsive spacing
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'gray',
    marginBottom: 20,
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

  detailsContainer: {
    alignItems: 'center',
  },
  detailText: {
    fontSize: 20,
    padding: 5,
  },
  activeText: {
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Full width for button container
    marginTop: 10, // Space between status and buttons
  },
  editButton: {
    paddingHorizontal: 20,
    backgroundColor: '#FFD700',
    borderRadius: 5,
    flex: 1, // Allow the button to grow
    alignItems: 'center', // Center align the text
    marginRight: 5, // Add margin for spacing between buttons
  },
  editButton2: {
    paddingHorizontal: 20,
    backgroundColor: '#FFD700',
    borderRadius: 5,
    flex: 1, // Allow the button to grow
    alignItems: 'center', // Center align the text
    marginLeft: 5, // Add margin for spacing between buttons
  },
  buttonText: {
    fontSize: 20, // Decreased font size for better fit
    padding: 5,
    color: 'white',
    textAlign: 'center', // Center align text
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 20,
    padding: 5,
  },
  icon: {
    width: 40,
    height: 40,
  },
});
