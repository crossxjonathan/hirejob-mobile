/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '@env';

const SkillContainer = ({id}) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const GetSkill = async () => {
    try {
      console.log(id, '<<<<<<<<<<<<<<<<<<id');
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      if (id) {
        const res = await axios.get(`${API_URL}/skills/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.status === 'error') {
          throw new Error(res.data.message);
        }
        setSkills(res.data.data);
      } else {
        const res = await axios.get(`${API_URL}/skills`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.status === 'error') {
          throw new Error(res.data.message);
        }
        setSkills(res.data.data);
      }
      setLoading(false);
      setError('');
      // console.log(res.data.data, 'Skills data fetched successfully');
    } catch (error) {
      console.error(
        'Error fetching skills:',
        error.response?.data || error.message,
      );
      Alert.alert('Error', error.response?.data?.message || error.message);
      setLoading(false);
      setError('Skills not found');
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
      {/* <Text style={{color: 'black'}}>Skill ={JSON.stringify(skills)}</Text> */}
      {loading ? (
        <Text
          style={{
            color: 'blue',
            textAlign: '#FBB017',
            fontWeight: '600',
            fontSize: 18,
          }}>
          Loading...
        </Text>
      ) : error ? (
        <Text
          style={{
            color: '#FF0000',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 18,
          }}>
          Error: {error}
        </Text>
      ) : skills.length === 0 ? (
        <Text
          style={{
            color: '#000000',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 18,
          }}>
          No Skills Found
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

export default SkillContainer;
