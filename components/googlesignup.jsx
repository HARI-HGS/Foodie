import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

const GoogleSignInButton = () => {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.6}>
      <View style={styles.contentWrapper}>
        <View style={styles.iconWrapper}>
          <Image
            style={styles.icon}
            source={require('../assets/images/googleLogo.png')}
          />
        </View>
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 4,
    height: 40,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    maxWidth: 250,
    minWidth: 'min-content',
    shadowColor: 'rgba(60, 64, 67, 0.30)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  iconWrapper: {
    marginRight: 12,
    width: 20,
    height: 20,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  buttonText: {
    flexGrow: 1,
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 14,
    color: '#1f1f1f',
    
  },
});

export default GoogleSignInButton;
