import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const MenuPage = () => {
    const data = [
        { uid: 1, img: require('../../assets/images/menu1.jpg') },
        { uid: 2, img: require('../../assets/images/menu2.jpg') },
        { uid: 3, img: require('../../assets/images/menu3.jpg') }
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.outerContainer}>
                {data.map(item => (
                    <View key={item.uid} style={styles.cardContainer}>
                        <Image source={item.img} style={styles.image} />
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

export default MenuPage;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFD700',
    },
    outerContainer: {
        alignItems: 'center',
        paddingVertical: 20,
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
        height: 500,
        borderRadius: 10,
        resizeMode: 'cover',
    },
});
