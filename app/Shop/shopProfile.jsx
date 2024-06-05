import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

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
      </View>
      <TouchableOpacity style={styles.editButton} onPress={()=> router.push('adsCollection')}>
        <Text style={styles.buttonText}>Add Ads</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editButton2}>
        <Text style={styles.buttonText}>Your Shop</Text>
      </TouchableOpacity>
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
  },
  topContainer: {
    alignItems: 'center',
    marginTop: 80,
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
  editButton: {
    paddingHorizontal: 20,
    backgroundColor: '#FFD700',
    position: 'absolute',
    top: 430,
    left: 30,
    borderRadius: 5,
  },
  editButton2: {
    paddingHorizontal: 20,
    backgroundColor: '#FFD700',
    position: 'absolute',
    top: 430,
    right: 30,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 30,
    padding: 5,
    color: 'white',
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
