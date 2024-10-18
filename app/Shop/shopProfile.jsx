import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window'); // Get the window width for responsive design

const ShopProfile = () => {
  const [shopStatus, setShopStatus] = useState('Open');
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.headerText}>Shop Keeper</Text>
        <View style={styles.profileImageContainer}>
          {/* Add your image source here */}
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Name</Text>
          <Text style={styles.detailText}>Phone Number</Text>
          <Text style={styles.detailText}>Email Id</Text>
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
}

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
