import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '@env';

const SkillBase = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const GetSkill = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      console.log(res, '<<<<<<<<<<<<<<<<<<<<<<<res');
      const res = await axios.get(`${API_URL}/skills`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSkills(res.data.data);
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
      setError('Fetching Profile Failure');
    }
  };

  useEffect(() => {
    GetSkill();
  }, []);

  return (
    <View
      style={{
        paddingTop: 3,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
      {loading ? (
        <Text
          style={{
            color: '#ffffff',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 18,
          }}>
          Loading...
        </Text>
      ) : error ? (
        <Text
          style={{
            color: '#ffffff',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 18,
          }}>
          Error: {error}
        </Text>
      ) : (
        skills.map((skill, index) => (
          <View
            key={index}
            style={{
              backgroundColor: '#FBB017',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
              margin: 3,
            }}>
            <Text
              style={{
                color: '#ffffff',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: 14,
              }}>
              {skill.skill_name}
            </Text>
          </View>
        ))
      )}
    </View>
  );
};

export default SkillBase;
