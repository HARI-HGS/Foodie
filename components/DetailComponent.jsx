import { StyleSheet, Text, View,ScrollView ,Image,TextInput} from 'react-native'
import React from 'react'
import Ambiance from './Ambiance'

const DetailComponent = () => {

    const data = [{
        shopName:'PankCke Restaurant',
        shopImageurl:require('../assets/images/shop6.jpg'),
        shopDiscription:'PankCakes and Desserts are available in this hotel'
        
    }]


  return (

        <View>
        <View style={styles.imageContainer}>
            <Image style={{height:'100%',width:'100%'}}source={data[0].shopImageurl}/>
        </View>
        <View style={styles.discriptionContainer}>
        <Text style={{padding:5,fontSize:20}}>{data[0].shopDiscription}</Text>
        <Text style={{padding:5,fontSize:20}}>Rating:</Text>
        <Text style={{padding:5,fontSize:20,color:'gray'}}>View all Comments below...</Text>
        <TextInput
        placeholder='Comment here...'
        style={{paddingHorizontal:20,backgroundColor:'lightgray',borderRadius:10,marginHorizontal:5,paddingVertical:10,marginBottom:10}}
        />
        </View>
        <View style={{width:'100%',alignItems:"center",justifyContent:'center'}}>
        <Text style={styles.text}>Hotel Ambiance</Text>
        </View>
        
        <Ambiance/>
        
     

        </View>
    
  )
}


export default DetailComponent

const styles = StyleSheet.create({

ambianceContainer:{
width:'100%',
backgroundColor:'lightpink'
    
},
 text:{
   
    fontSize:20,
    fontWeight:'bold',
    padding:5,
   

 },

 imageContainer:{
 
    height:250,
    marginTop:10
   
    
 },
 discriptionContainer:{
  
 marginTop:10
 },

})