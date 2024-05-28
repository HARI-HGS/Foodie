import { View, Text ,Image,StyleSheet} from 'react-native';
import React from 'react';
import { Tabs, Redirect, Stack } from 'expo-router';
import { icons } from '../../constants';

const TabIcon = ({icon,color,name,focused}) =>{
  return (
    <View style={styles.name}>
      <Image source={icon} resizeMode="contain" tintColor={color} style={styles.icon}
      />
      <Text style={{color:color}}>{name}</Text>
      
    </View>
    
  )
}

const TabsLayout = () => {
  return (
    <>
    <Tabs screenOptions={{
      
      tabBarShowLabel: false, 
      tabBarActiveTintColor:'#FFD700', 
      tabBarInactiveTintColor:'#000000',
      tabBarStyle:{
       backgroundColor:'#FFFFFF',
       height:50, 
       borderTopWidth: 0,
       elevation: 0, 
      
    },
    headerShown:false,
    }}>
      <Tabs.Screen 
       name="home" 
       options={{
        title:"Home", 
       
        tabBarIcon:({color,focused})=>(
        <TabIcon
        icon={icons.home}
        color={color}
        name="Home"
        focused={focused}
        />
        )
      }}/>

<Tabs.Screen 
       name="profile" 
       options={{
        title:"profile", 
        
        tabBarIcon:({color,focused})=>(
        <TabIcon
        icon={icons.profile}
        color={color}
        name="profile"
        focused={focused}
        />
        )
      }}/>
      <Tabs.Screen 
       name="register" 
       options={{
        title:"register", 
        tabBarIcon:({color,focused})=>(
        <TabIcon
        icon={icons.reg}
        color={color}
        name="register"
        focused={focused}
        />
        ),tabBarStyle:{ display: 'none' },
      }}/>

      
    </Tabs>
    </>
  )
}

export default TabsLayout 

const styles = StyleSheet.create({

  icon:{
    height:25,
    width:"100%",
    
  },

  name:{
    alignItems:'center',
    justifyContent:'center',
    gap:2,
    position:'absolute',
    top:2,
  }

})