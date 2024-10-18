import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, TextInput, Modal, FlatList } from 'react-native';
import { icons } from '../constants';
import AutoSlidingView from './AutoSlidingView';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const FunCard = () => {
  const [imageDimensions, setImageDimensions] = useState({});
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [searchModalVisible, setSearchModalVisible] = useState(false); // Modal visibility state
  const [suggestions, setSuggestions] = useState([
    "Pizza Place", "Burger King", "Sushi House", "PanCake Restaurant",
    "Ibaco", "DreamCake Creams", "Ice Cream Corner", "Taco Town"
  ]);
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);
  const router = useRouter();

  const contact = [
    {
      uid: 1,
      shopName: 'PanCake Restaurant',
      imgUrl: require('../assets/images/shop4.jpg'),
      commentsimgUrl: require('../assets/images/cmtimg.png'),
      likes: '25.5k',
      viewcmt: 'View all comments below...',
    },
    {
      uid: 2,
      shopName: 'Ibaco',
      imgUrl: require('../assets/images/shop2.png'),
      commentsimgUrl: require('../assets/images/cmtimg.png'),
      likes: '55.5k',
      viewcmt: 'View all comments below...',
    },
    {
      uid: 3,
      shopName: 'DreamCake Creams',
      imgUrl: require('../assets/images/shop6.jpg'),
      commentsimgUrl: require('../assets/images/cmtimg.png'),
      likes: '10.5k',
      viewcmt: 'View all comments below...',
    },
    // ... Other contacts
  ];

  const onImageLoad = (event, uid) => {
    const { width: imageWidth, height: imageHeight } = event.nativeEvent.source;
    const aspectRatio = imageHeight / imageWidth;
    const adjustedHeight = width * aspectRatio;

    setImageDimensions(prevState => ({
      ...prevState,
      [uid]: adjustedHeight,
    }));
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    if (text.length > 0) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions(suggestions);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion);
    setSearchModalVisible(false); // Close the modal after selection
  };

  // Filtered contacts based on search query
  const filteredContacts = contact.filter(contact =>
    contact.shopName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ width }}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => setSearchModalVisible(true)} style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            editable={false} // Open modal on click, not editable here
          />
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={icons.search} style={styles.searchIcon} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <View style={{ width: '100%', height: 150 }}>
        <AutoSlidingView />
      </View>

      <View style={{ width: '100%', alignItems: 'center' }}>
        <Text style={{ padding: 10, fontWeight: 'bold', fontSize: 20 }}>Top Restaurants and Hotels near you</Text>
      </View>

      <View style={styles.cardTotal}>
        {filteredContacts.map((contact) => (
          <View key={contact.uid} style={styles.cards}>
            <View style={styles.inlineContainer}>
              <View style={styles.shopNameContainer}>
                <Text style={styles.heading}>{contact.shopName} (<Text style={{ color: 'green' }}>Open</Text>)</Text>
              </View>
              <TouchableOpacity
                onPress={() => router.push('shopDetails/details')}
                style={styles.moreButton}
              >
                <Text style={styles.moreButtonText}>More</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={contact.imgUrl}
              style={[styles.image, { height: imageDimensions[contact.uid] || 0 }]}
              resizeMode="contain"
              onLoad={(event) => onImageLoad(event, contact.uid)}
            />
            <View style={styles.btnsContainer}>
              <TouchableOpacity>
                <Text style={styles.btns}>Likes({contact.likes})</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.btns}>View Comments</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.btns}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.btns}>Share</Text>
              </TouchableOpacity>
            </View>
            <TextInput placeholder="Add Comment" style={{ backgroundColor: 'lightgray', margin: 5, borderRadius: 10, padding: 5 }} />
          </View>
        ))}
      </View>

      {/* Modal for search suggestions */}
      <Modal
        visible={searchModalVisible}
        animationType="slide"
        onRequestClose={() => setSearchModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.modalSearchBox}
            placeholder="Type your search"
            value={searchQuery}
            onChangeText={handleSearchChange}
            autoFocus={true} // Focus when modal opens
          />
          <FlatList
            data={filteredSuggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSuggestionSelect(item)}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={() => setSearchModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  btns: {
    padding: 5,
    fontSize: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 5,
    marginHorizontal: 5,
  },
  btnsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 10,
    padding: 5,
    borderColor: '#BEBEBE',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  searchInput: {
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
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 2,
  },
  image: {
    width: '100%',
  },
  cards: {
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 20,
  },
  cardTotal: {
    borderColor: '#000000',
    borderRadius: 5,
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 5,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 2,
    paddingRight: 5, // Add padding to the right to prevent button overflow
  },
  shopNameContainer: {
    flex: 1, // Ensures shop name takes up remaining space
  },
  moreButton: {
    minWidth: 70, // Set a fixed width for the "More" button
    alignItems: 'flex-end',
  },
  moreButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: '#FF3A3A',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  modalSearchBox: {
    borderWidth: 1,
    borderColor: '#BEBEBE',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#BEBEBE',
  },
  closeButton: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FF3A3A',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default FunCard;