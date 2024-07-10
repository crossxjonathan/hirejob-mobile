/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '@env';

const Category = ({id, onSkillsData}) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getSkills = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      let url = `${API_URL}/skills`;
      if (id) {
        url += `/${id}`;
      }
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.status === 'error') {
        throw new Error(res.data.message);
      }
      setSkills(res.data.data);
      onSkillsData(res.data.data);
    } catch (error) {
      console.error(
        'Error fetching skills:',
        error.response?.data || error.message,
      );
      Alert.alert('Error', error.response?.data?.message || error.message);
      setError('Skills not found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSkills();
  }, [id]);

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
        skills.slice(0, 2).map((skill, index) => (
          <View
            key={index}
            style={{
              backgroundColor: '#FBB017',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
              margin: 3,
            }}>
            <Text style={{color: '#ffffff', fontWeight: '600', fontSize: 14}}>
              {skill.skill_name}
            </Text>
          </View>
        ))
      )}
    </View>
  );
};

export default Category;
