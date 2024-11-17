import { StyleSheet, Text, Image, View, TouchableOpacity, ScrollView, RefreshControl, Alert } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../../constants';
import AutoSlidingView from '../../components/AutoSlidingView';
import FunCard from '../../components/FunCard';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps'; // Import MapView and Marker
import { Dimensions, Platform, PixelRatio } from 'react-native';

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

const Home = () => {


  const navigation = useNavigation();
  const router = useRouter();
  const [cityName, setCityName] = useState('');
  const [fullLocation, setFullLocation] = useState('');
  const [coordinates, setCoordinates] = useState(null); // Store latitude and longitude
  const [refreshing, setRefreshing] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [streetName, setStreetName] = useState('');
  const [district, setDistrict] = useState(''); 
 


  // Function to request location permission and get location
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location access is required to use this feature.');
      return;
    }

    // Get current location
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    setCoordinates({ latitude, longitude }); // Store coordinates for the map

    // Get city name and full location from latitude and longitude
    const address = await Location.reverseGeocodeAsync({ latitude, longitude });
if (address.length > 0) {
  const { street, city, district, region, postalCode } = address[0]; // Get street
  setStreetName(street || 'Unknown Street'); // Set street name
  setCityName(city || district || region || 'Unknown Location');
  setPinCode(postalCode || 'Unknown Pin Code');
  setDistrict(district || 'unknown region') // Set pin code
}  

  };


  useEffect(() => {
    requestLocationPermission();
  }, []);



  //used for exiting app
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        const isAtHomeScreen = navigation.getState().routeNames[navigation.getState().index] === 'Home';

        if (Home) {
          Alert.alert(
            'Exit App',
            'Are you sure you want to exit the app?',
            [
              {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => BackHandler.exitApp(),
              },
            ],
            { cancelable: false }
          );
          return true; // Prevent default back action
        }

        return false; // Allow default behavior if not on home screen
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation])
  );



  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request or any async operation
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);



  

  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.imgContainer}>
        <TouchableOpacity style={{ width: '10%', height: '65%', position: 'absolute', left: 0, marginLeft: 5, top: 8 }}>
          <Image style={{ width: '100%', height: '100%', position: 'absolute', left: 0 }} source={require('../../assets/icons/hamburger.png')} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('(tabs)/profile')} style={{ width: '13%', height: '65%', position: 'absolute', left: 50, marginLeft: 5, top: 8 }}>
          <Image style={{ width: '80%', height: '100%' }} source={require('../../assets/icons/profileicon.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.locationContainer}>
           <Image style={styles.Image} source={require('../../assets/images/location.png')} />
           <Text style={{ fontSize: 15, position: 'absolute', left: 25, marginLeft: 10 }}>
             {cityName || 'Location'}  {/* Display city name or default text */}
            </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('favpage/fav')} style={{ width: '7%', height: '95%', position: 'absolute', right: 30, top: 10 }}>
          <Image source={require('../../assets/images/fav.png')} style={{ width: '100%', height: '55%' }} />
        </TouchableOpacity>
      </View>

      {/* Display current location details */}
      <TouchableOpacity style={styles.locationDetails}>
        <Image style={{ width: '6%', height: '75%', marginRight: 20 }} source={require('../../assets/images/locationicon.png')} />
        <Text style={styles.locationText}>
         {cityName ? `${cityName}, ` : ""}
         {district ? `${district}, ` : ""}
         {pinCode ? `Pin Code: ${pinCode}` : ""}
        </Text>      
      </TouchableOpacity>

      {/* Map View to show the current location with a pin */}
      {coordinates && (
        
          <Marker
            coordinate={coordinates}
            title={cityName}
            description={fullLocation}
          />
        
      )}

      <ScrollView style={{ width: '100%' }} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <FunCard />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({

  locationDetails: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    flexWrap: 'nowrap', // Ensure the row doesn't wrap
  },

  locationText: {
    fontSize: normalize(20),
    flexShrink: 1,  // Prevent the text from overflowing outside
    flexWrap: 'wrap',  // Allow text to wrap onto the next line if too long
  },
  headerContainer: {
   
    width: '100%',
    height: '100%',
    borderColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  imgContainer: {
    width: '100%',
    height: '7%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent:'center',
    
    
  },
  locationContainer: {
    width: '50%',
    height: '45%',
    marginTop: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8E9EB',
    marginLeft:20,
  },
  Image: {
    width: '10%',
    height: '85%',
    position: 'absolute',
    left: 0,
    margin: 5,
  },
  favimg: {
    width: '7%',
    height: '55%',
    position: 'absolute',
    right: 30,
    top: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    margin:10,
    height:'100%',
    borderColor: '#BEBEBE',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',

    
  },
  searchBox: {
    flex: 1,
    color: 'black',
    paddingHorizontal: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchIcon: {
    tintColor: '#BEBEBE',
    width: 20,
    height: 20,
  },
});
