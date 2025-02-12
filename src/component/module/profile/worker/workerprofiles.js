import {View, Text, Image, Alert} from 'react-native';
import React, {useState, useCallback} from 'react';
import Profile from '../../../../assets/image/bg/profile1.png';
import Location from '../../../../assets/image/icon/map.png';
import LargeButtonPurple from '../../../base/button/largebuttonpurple';
import SkillContainer from '../../Skill/skillcontainer';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import LargeTransparentPurple from '../../../base/button/largetransparentpurple';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '@env';

const WorkerProfiles = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      Alert.alert('Logged out', 'You have been logged out successfully.');
      navigation.navigate('LoginWorker');
    } catch (error) {
      console.error('Error logging out: ', error);
      Alert.alert('Logout Error', 'Something went wrong. Please try again.');
    }
  };

  const handleGetProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const res = await axios.get(`${API_URL}/workers/profile`, {
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
          source={profile.photo ? {uri: profile.photo} : Profile}
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            border: '2px solid #000000',
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
          {profile.name || 'Name:....'}
        </Text>
        <Text style={{color: '#1F2A36', fontSize: 14, fontWeight: '400'}}>
          {profile.job_desk || 'Job:....'}
        </Text>
        <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
          <Image source={Location} style={{width: 20, height: 20}} />
          <Text style={{color: '#aaaaaa', fontWeight: '400'}}>
            {profile.domicile || 'Location:....'}
          </Text>
        </View>
        <Text style={{color: '#aaaaaa', fontSize: 16, fontWeight: '500'}}>
          {profile.workplace || 'workplace:....'}
        </Text>
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
            onPress={() => navigation.navigate('EditWorkerProfile')}
          />
          <LargeTransparentPurple label="Log out" onPress={handleLogout} />
        </View>
        <View>
          <Text style={{color: '#000000', fontSize: 20, fontWeight: '600'}}>
            Skill
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flex: 1,
              flexWrap: 'wrap',
              gap: 10,
              paddingTop: 10,
            }}>
            <SkillContainer />
          </View>
        </View>
      </View>
    </View>
  );
};

export default WorkerProfiles;
