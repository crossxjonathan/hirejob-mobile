import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {
  ChatIcon,
  MenuIcon,
  ProfileIcon,
  SearchIcon,
} from '../../../assets/image/icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '@env';

function FootBar({state, descriptors, navigation}) {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get(`${API_URL}/recruiters/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileImage(response.data.profile?.photo);
      } catch (error) {
        console.log('Error fetching profile image:', error);
      }
    };

    fetchProfileImage();
  }, []);

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const Icon = () => {
          const iconStyle = [
            styles.icon,
            label === 'Profile' && styles.profileIcon,
          ];
          if (label === 'Home') {
            return (
              <MenuIcon
                fill={isFocused ? '#673ab7' : '#aaaaaa'}
                style={iconStyle}
              />
            );
          }
          if (label === 'Search') {
            return (
              <SearchIcon
                fill={isFocused ? '#673ab7' : '#aaaaaa'}
                style={iconStyle}
              />
            );
          }
          if (label === 'Chat') {
            return (
              <ChatIcon
                fill={isFocused ? '#673ab7' : '#aaaaaa'}
                style={iconStyle}
              />
            );
          }
          if (label === 'Profile') {
            return (
              <View style={styles.profileIconContainer}>
                {profileImage ? (
                  <Image
                    source={{uri: profileImage}}
                    style={styles.profileImage}
                  />
                ) : (
                  <ProfileIcon
                    fill={isFocused ? '#673ab7' : '#aaaaaa'}
                    style={iconStyle}
                  />
                )}
              </View>
            );
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}>
            <Icon />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default FootBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIconContainer: {
    borderWidth: 2,
    borderColor: 'purple',
    borderRadius: 30,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  profileIcon: {
    width: 40,
    height: 40,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
});
