import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { Provider } from 'react-redux'
import store from './Store/store'

import Home from './screens/Home'
import CreateUser from './screens/Users/CreateUser'
import Faq from './src/componentes/Faq'
import Login from './screens/Login'
const Stack= createStackNavigator()

function MyStack(){
  return(
    <Stack.Navigator>
      {/* este nos va a permitir crear las pantallas */}

     <Stack.Screen name="Home" component={Home}/>
     <Stack.Screen name= "CreateUser" component={CreateUser}/>
     <Stack.Screen name= "Faq" component={Faq}/>
     <Stack.Screen name= "Login" component={Login}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
    {/* <MyStack/> */}
    <MyStack/>
  </NavigationContainer>
  </Provider>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
