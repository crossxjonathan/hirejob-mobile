import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingPage from '../screens/LandingPage/index';
import Home from '../screens/Home/index';
import LoginWorker from '../screens/auth/LoginWorker';
import LoginRecruiter from '../screens/auth/LoginRecruiter';
import RegisterWorker from '../screens/auth/RegisterWorker';
import RegisterRecruiter from '../screens/auth/RegisterRecruiter';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Chat from '../screens/chat';
import RecruiterProfile from '../screens/Profile/recruiterprofile';
import EditWorkerProfile from '../screens/Profile/editworkerprofile';
import WorkerProfile from '../screens/Profile/workerprofile';
import SearchPage from '../screens/search';
import TabBar from '../component/module/TabBar/TabBar';

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Search"
        component={SearchPage}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Tab.Screen
        name="ProfileWorker"
        component={WorkerProfile}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Edit Worker"
        component={EditWorkerProfile}
        options={{headerShown: false}}
      />
      {/* <Tab.Screen
        name="Recruiter"
        component={RecruiterProfile}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};

const MainRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LandingPage"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="LoginWorker" component={LoginWorker} />
        <Stack.Screen name="LoginRecruiter" component={LoginRecruiter} />
        <Stack.Screen name="RegisterWorker" component={RegisterWorker} />
        <Stack.Screen name="RegisterRecruiter" component={RegisterRecruiter} />
        <Stack.Screen name="MainTab" component={MainTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRouter;
