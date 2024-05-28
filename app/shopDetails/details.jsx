import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DetailComponent from '../../components/DetailComponent';
import{useRouter} from 'expo-router';
const Details = () => {
    const router = useRouter();
    const data = [{
        shopName: 'Pancake Restaurant',
        shopImageurl: require('../../assets/images/shop6.jpg'),
        shopDiscription: 'Pancakes and Desserts are available in this hotel'
    }];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{data[0].shopName}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <DetailComponent />
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity onPress={()=> router.push('shopDetails/menupage')}>
                <Text style={styles.footerText}>Menu Card^</Text>
                </TouchableOpacity>
                <View style={{width:'auto',height:'auto',backgroundColor:'#FFD700',borderRadius:5}}>
                <TouchableOpacity>
                <Text style={styles.footerText}>Get Direction</Text>
                </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    );
}

export default Details;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    scrollViewContent: {
        paddingBottom: 80, // Add space to ensure the footer is not overlapped
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopColor: 'gray',
        backgroundColor:'white'
    },
    footerText: {
        fontSize: 20,
        fontWeight: 'bold',
        padding:5,
        paddingHorizontal:20,
        
    },
});
