import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot,Stack } from 'expo-router'
const RootLayout = () => {
  return (

    <Stack>
      <Stack.Screen name='index' options={{headerShown:false}}/>
      <Stack.Screen name='(tabs)' options={{headerShown:false}}/>
      <Stack.Screen name='shopDetails/details' options={{headerShown:false}}/>
      <Stack.Screen name='shopDetails/menupage' options={{headerShown:false}}/>
      <Stack.Screen name='favpage/fav' options={{headerShown:false}}/>
      <Stack.Screen name='signUp/signUp' options={{headerShown:false}}/>
      <Stack.Screen name='Shop/shopProfile' options={{headerShown:false}}/>
      <Stack.Screen name='register' options={{headerShown:false}}/>
      <Stack.Screen name='adsCollection' options={{headerShown:false}}/>
      </Stack>
   
  )
}


export default RootLayout

