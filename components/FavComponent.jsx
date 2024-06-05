import { StyleSheet, Text, View, Image, ScrollView , TouchableOpacity , Dimensions, TextInput} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window');
import{useRouter} from 'expo-router';
const FavComponent = () => {
    const [imageDimensions, setImageDimensions] = useState({});
    const router = useRouter();
    const onImageLoad = (event, uid) => {
        const { width: imageWidth, height: imageHeight } = event.nativeEvent.source;
        const aspectRatio = imageHeight / imageWidth;
        const adjustedHeight = width * aspectRatio;
    
        setImageDimensions(prevState => ({
          ...prevState,
          [uid]: adjustedHeight,
        }));
      };



    const contact = [
        {
          uid: 1,
          shopName: 'PanCake Restaurant',
          imgUrl: require('../assets/images/shop2.png'),
          commentsimgUrl: require('../assets/images/cmtimg.png'),
          likes: '25.5k',
          viewcmt: 'View all comments below...',
        },
        {
          uid: 2,
          shopName: 'Ibaco',
          imgUrl: require('../assets/images/shop4.jpg'),
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
    
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.outerContainer}>
            {contact.map((contact) => (
          <View key={contact.uid} style={styles.cardContainer}>
            <View style={styles.inlineContainer}>
              <View style = {{width:'90%'}}>
              <Text style={styles.heading}>{contact.shopName}</Text></View>
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
            
            
          </View>
        ))}
            </ScrollView>
        </SafeAreaView>
    );
}

export default FavComponent;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    outerContainer: {
        alignItems: 'center',
        paddingVertical:0,
    },
    cardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
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
        marginHorizontal:40,
        marginBottom: 10,
        marginTop: 10,
       
      },
});
