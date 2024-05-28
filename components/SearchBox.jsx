import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';

const SearchBox = () => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search"
      />
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  searchContainer: {
    width: '90%',
    height: '6%',
    borderColor: '#BEBEBE',
    borderWidth: 1,
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  searchBox: {
    height: '100%',
    width: '100%',
    color: 'black',
  },
});
