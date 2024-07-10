/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, Image, Alert, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Profile from '../../../../assets/image/bg/profile1.png';
import Location from '../../../../assets/image/icon/map.png';
import LargeButtonPurple from '../../../base/button/largebuttonpurple';
import SkillContainer from '../../Skill/skillcontainer';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';

const WorkerProfileDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {id} = route.params;
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleGetProfile = async () => {
    try {
      console.log(id, '<<<<<<<<<<<<<<<<<<<<<<<<<id');
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const res = await axios.get(`${API_URL}/workers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(res.data.data);
      setLoading(false);
      setError('');
      console.log(res.data.data, 'Profile data fetched successfully');
    } catch (error) {
      console.error(
        'Error fetching profile:',
        error.response?.data || error.message,
      );
      Alert.alert('Error', error.response?.data?.message || error.message);
      setLoading(false);
      setError(error.response?.data?.message || 'Fetching Profile Failure');
    }
  };

  const handleHire = () => {
    navigation.navigate('HireWorker');
  };

  useEffect(() => {
    if (id) {
      handleGetProfile(id);
    }
  }, [id]);

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        paddingVertical: 40,
        backgroundColor: '#ffffff',
      }}>
      <View>
        <Image
          source={profile.photo ? {uri: profile.photo} : Profile}
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: '#000000',
          }}
        />
      </View>
      <View
        style={{paddingTop: 20, alignItems: 'baseline', width: '90%', gap: 5}}>
        <Text style={{color: '#000000', fontSize: 20, fontWeight: '600'}}>
          {profile.name ? profile.name : 'Name:'}
        </Text>
        <Text style={{color: '#1F2A36', fontSize: 14, fontWeight: '400'}}>
          {profile.job_desk ? profile.job_desk : 'Job:'}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <Image source={Location} style={{width: 20, height: 20}} />
          <Text style={{color: '#aaaaaa', marginLeft: 5}}>
            {profile.domicile ? profile.domicile : 'Domicile:'}
          </Text>
        </View>
        <Text style={{color: '#aaaaaa', fontSize: 14, fontWeight: '500'}}>
          {profile.workplace ? profile.workplace : 'Workplace:'}
        </Text>
        <Text
          style={{
            color: '#aaaaaa',
            fontSize: 16,
            fontWeight: '500',
            paddingBottom: 20,
            textAlign: 'left',
          }}>
          {profile.description || 'Description'}
        </Text>
        <LargeButtonPurple onPress={handleHire} label="Hire" />
        <Text
          style={{
            color: '#000000',
            fontSize: 20,
            fontWeight: '600',
            marginVertical: 20,
          }}>
          Skill
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
          }}>
          <SkillContainer id={id} />
        </View>
      </View>
    </ScrollView>
  );
};

export default WorkerProfileDetail;
