import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingPage from '../screens/LandingPage/index';
import Home from '../screens/Home/index';
import LoginWorker from '../screens/auth/LoginWorker';
import LoginRecruiter from '../screens/auth/LoginRecruiter';
import RegisterWorker from '../screens/auth/RegisterWorker';
import RegisterRecruiter from '../screens/auth/RegisterRecruiter';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EditWorkerProfile from '../screens/Profile/editworkerprofile';
import WorkerProfile from '../screens/Profile/workerprofile';
import SearchPage from '../screens/search';
import TabBar from '../component/module/TabBar/TabBar';
import DetailWorker from '../screens/Profile/detailworker';
import RecruiterProfile from '../screens/Profile/recruiterprofile';
import HomeRecruiter from '../screens/Home/recruiter';
import EditRecruiterProfile from '../screens/Profile/editrecruiterprofile';
import FootBar from '../component/module/TabBar/footbar';
import HireWorker from '../screens/Hire';
import HistoryWorker from '../screens/history/history';
import ChatPage from '../screens/chat';
import {Image, StyleSheet} from 'react-native';

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
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const RecruiterTab = () => {
  return (
    <Tab.Navigator tabBar={props => <FootBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeRecruiter}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Search"
        component={SearchPage}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileRecruiterStack}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileWorker"
        component={WorkerProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditWorkerProfile"
        component={EditWorkerProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const ProfileRecruiterStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileRecruiter"
        component={RecruiterProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditRecruiterProfile"
        component={EditRecruiterProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const MainRouter = () => {
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowImage(false);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <NavigationContainer>
      {showImage && (
        <Image
          source={require('../assets/image/peworld.png')}
          style={styles.image}
        />
      )}
      <Stack.Navigator
        initialRouteName="LandingPage"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="HistoryWorker" component={HistoryWorker} />
        <Stack.Screen name="HireWorker" component={HireWorker} />
        <Stack.Screen name="ChatPage" component={ChatPage} />
        <Stack.Screen name="DetailWorker" component={DetailWorker} />
        <Stack.Screen name="LoginWorker" component={LoginWorker} />
        <Stack.Screen name="LoginRecruiter" component={LoginRecruiter} />
        <Stack.Screen name="RegisterWorker" component={RegisterWorker} />
        <Stack.Screen name="RegisterRecruiter" component={RegisterRecruiter} />
        <Stack.Screen name="MainTab" component={MainTab} />
        <Stack.Screen name="RecruiterTab" component={RecruiterTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default MainRouter;
