import React, { useState } from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, TextInput } from 'react-native';
const { width } = Dimensions.get('window');
import { icons } from '../constants';
import AutoSlidingView from './AutoSlidingView';
import{useRouter} from 'expo-router';

function OpenWebsite(WebsiteLink) {
  Linking.openURL(WebsiteLink);
}

 const FunCard = () => {
  const [imageDimensions, setImageDimensions] = useState({});
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
    {
      uid: 4,
      shopName: 'PanCake Restaurant',
      imgUrl: require('../assets/images/shop4.jpg'),
      commentsimgUrl: require('../assets/images/cmtimg.png'),
      likes: '25.5k',
      viewcmt: 'View all comments below...',
    },
    {
      uid: 5,
      shopName: 'DreamCake Creams',
      imgUrl: require('../assets/images/shop6.jpg'),
      commentsimgUrl: require('../assets/images/cmtimg.png'),
      likes: '10.5k',
      viewcmt: 'View all comments below...',
    },
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

  return (
      <View style={{width}}>
      <View style={styles.searchContainer}>
      <TextInput
            style={styles.searchBox}
            placeholder="Search"
          />
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={icons.search} style={styles.searchIcon} />
          </TouchableOpacity>

      </View>
      <View style={{width:'100%',height:150}}>
      <AutoSlidingView/>
      </View>
      <View style={{width:'100%',alignItems:'center'}}>
      <Text style={{padding:10,fontWeight:'bold',fontSize:20}}>Top Restarents and Hotels near you</Text>
      </View>
      
      <View style={styles.cardTotal}>
        {contact.map((contact) => (
          <View key={contact.uid} style={styles.cards}>
            <View style={styles.inlineContainer}>
              <View style = {{width:'80%'}}>
              <Text style={styles.heading}>{contact.shopName} (<Text style={{color:'green'}}>Open</Text>)</Text></View>
              <TouchableOpacity
                onPress={()=> router.push('shopDetails/details')}
              >
                <Text style={[styles.heading, styles.button]}>More</Text>
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
                <Text style={styles.btns}> View Comments</Text>
              </TouchableOpacity>
              
              <TouchableOpacity>
                <Text style={styles.btns}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.btns}>Share</Text>
              </TouchableOpacity>
            </View>
            <TextInput placeholder="Add Comment" style={{backgroundColor:'lightgray',margin:5,borderRadius:10,padding:5}}>
              
            </TextInput>
            
          </View>
        ))}
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  btns:{

    padding:5,
    fontSize:20,
    backgroundColor:'white',
    borderRadius:10,
    marginTop:5,
    marginHorizontal:5
  },
  btnsContainer:{
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between'

  },

  searchContainer: {
    flexDirection: 'row',
    marginHorizontal:5,
    marginVertical:10,
    padding:5,
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
  containerHeading1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  viewCmt: {
    alignSelf: 'flex-start',
  },

  likes: {
    color: '#000000',
    fontSize: 10.5,
    paddingHorizontal: 1,
    marginLeft: 2,
    marginBottom: 2,
  },

  heading1: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 17,
  },

  cmtImg: {
    alignContent: 'flex-start',
    width: 100,
    height: 40,
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
    marginBottom:20
  },

  cardTotal: {
    borderColor: '#000000',
    borderRadius: 5,
    
  },

  button: {
    paddingHorizontal: 20,
    borderRadius: 3,
    paddingVertical: 3,
    backgroundColor: '#FF3A3A',
    color: '#FFFFFF',
  },

  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 5,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 2,
  },
});

export default FunCard;