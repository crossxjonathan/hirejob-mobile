import {View, Text, Image, Alert} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Profile from '../../../../assets/image/bg/profile1.png';
import Location from '../../../../assets/image/icon/map.png';
import Instagram from '../../../../assets/image/icon/instagram.png';
import Linkedin from '../../../../assets/image/icon/LinkedIn.png';
import LargeButtonPurple from '../../../base/button/largebuttonpurple';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LargeTransparentPurple from '../../../base/button/largetransparentpurple';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '@env';

const RecruiterProfiles = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      Alert.alert('Logged out', 'You have been logged out successfully.');
      navigation.navigate('LoginRecruiter');
    } catch (error) {
      console.error('Error logging out: ', error);
      Alert.alert('Logout Error', 'Something went wrong. Please try again.');
    }
  };

  const handleGetProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      // console.log(token, '<<<<<<<<<<<<<<token get profile');
      if (!token) {
        throw new Error('Token not found');
      }

      const res = await axios.get(`${API_URL}/recruiters/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(res.data.profile);
      setLoading(false);
      setError('');
      console.log(res.data.profile, 'Profile data fetched successfully');
    } catch (error) {
      console.error(
        'Error fetching profile:',
        error.response?.data || error.message,
      );
      Alert.alert('Error', error.response?.data?.message || error.message);
      setLoading(false);
      setError('Fetching Profile Failure');
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleGetProfile();
    }, []),
  );

  // useEffect(() => {
  //   handleGetProfile();
  // }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingTop: 40,
          gap: 15,
          backgroundColor: '#ffffff',
          height: 700,
          borderRadius: 10,
        }}>
        <Image
          source={
            profile.photo && typeof profile.photo === 'string'
              ? {uri: profile.photo}
              : Profile
          }
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            borderColor: '#673ab7',
            borderWidth: 2,
          }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          paddingTop: 150,
          paddingLeft: 20,
          gap: 10,
        }}>
        <Text style={{color: '#000000', fontSize: 20, fontWeight: '600'}}>
          {profile.name || 'Company:....'}
        </Text>
        <Text style={{color: '#1F2A36', fontSize: 14, fontWeight: '400'}}>
          {profile.position || 'Position:....'}
        </Text>
        <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
          <Image source={Location} style={{width: 20, height: 20}} />
          <Text style={{color: '#aaaaaa', fontWeight: '400'}}>
            {profile.city || 'City:....'}
          </Text>
        </View>
        <Text
          style={{
            color: '#aaaaaa',
            fontSize: 16,
            fontWeight: '500',
            paddingBottom: 20,
            textAlign: 'left',
          }}>
          {profile.description || 'Description:....'}
        </Text>
        <View
          style={{position: 'relative', right: 10, paddingBottom: 20, gap: 10}}>
          <LargeButtonPurple
            label="Edit"
            onPress={() => navigation.navigate('EditRecruiterProfile')}
          />
          <LargeTransparentPurple label="Log out" onPress={handleLogout} />
        </View>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flex: 1,
              flexWrap: 'wrap',
              gap: 10,
              paddingTop: 10,
            }}>
            <View style={{display: 'flex', flexDirection: 'column', gap: 5}}>
              <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
                <Image source={Instagram} style={{width: 36, height: 36}} />
                <Text style={{color: '#aaaaaa', fontWeight: '400', padding: 5}}>
                  {profile.instagram || 'Instagram :....'}
                </Text>
              </View>
              <View style={{display: 'flex', flexDirection: 'row', gap: 4}}>
                <Image source={Linkedin} style={{width: 36, height: 36}} />
                <Text style={{color: '#aaaaaa', fontWeight: '400', padding: 5}}>
                  {profile.linkedin || 'Linked in :....'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RecruiterProfiles;
