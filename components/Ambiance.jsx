import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const Ambiance = () => {
    const data = [
        { uid: 1, img: require('../assets/images/abb1.jpg') },
        { uid: 2, img: require('../assets/images/abb2.jpg') },
        { uid: 3, img: require('../assets/images/abb3.jpg') }
    ];

    return (
        <View>
            {data.map(item => (
                <View key={item.uid} style={styles.imageContainer}>
                    <Image source={item.img} style={styles.image} />
                </View>
            ))}
        </View>
    );
};

export default Ambiance;

const styles = StyleSheet.create({
    imageContainer: {
        
        margin: 5,
        alignItems: 'center',
    
    },
    image: {
        width: '100%',
        height: 300,
    },
});
