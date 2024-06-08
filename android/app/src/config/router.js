import { View, Text, SafeAreaView, Image, ImageBackground } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from './android/app/src/screens/LandingPage';
import Home from './android/app/src/screens/Home';
import LoginWorker from './android/app/src/screens/auth/LoginWorker';
import LoginRecruiter from './android/app/src/screens/auth/LoginRecruiter';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <SafeAreaView>
      <NavigationContainer initialState={LoginWorker}>
        <Stack.Navigator>
          <Stack.Screen name='LandingPage' component={LandingPage}/>
          <Stack.Screen name='Home' component={Home}/>
          <Stack.Screen name='LoginWorker' component={LoginWorker}/>
          <Stack.Screen name='LoginRecruiter' component={LoginRecruiter}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Router;
