import {View, Text, TextInput, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import SmallButton from '../../base/button/smallbutton';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Skill = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    skill_name: '',
  });

  const formRef = useRef(form);
  formRef.current = form;

  const AddSkill = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const payload = {
        skill_name: formRef.current.skill_name,
      };

      const response = await axios.post(`${API_URL}/skills`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setSkills(prevSkills => [...prevSkills, data]);
      setForm({skill_name: ''});
      Alert.alert('Add Skill Successfully!!');
    } catch (error) {
      console.error(
        'Error adding skill:',
        error.response?.data || error.message,
      );
      Alert.alert('Error', error.response?.data?.message || error.message);
    }
  };

  const GetSkill = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      const res = await axios.get(`${API_URL}/skills`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSkills(res.data.data);
      setLoading(false);
      setError('');
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

  const handleDeleteSkill = async id => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      await axios.delete(`${API_URL}/skills/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSkills(prevSkills => prevSkills.filter(skill => skill.id !== id));
      Alert.alert('Delete Skill Successfully!!');
    } catch (error) {
      console.error(
        'Error deleting skill:',
        error.response?.data || error.message,
      );
      Alert.alert('Error', error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    GetSkill();
  }, []);

  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        width: '100%',
        height: 'auto',
        borderRadius: 5,
      }}>
      <Text
        style={{
          color: '#000000',
          fontSize: 20,
          padding: 20,
          fontWeight: '600',
        }}>
        Skill
      </Text>
      <View
        style={{
          borderBottomColor: '#E2E5ED',
          borderBottomWidth: 1,
        }}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: 20,
        }}>
        <TextInput
          placeholder="Java"
          placeholderTextColor="gray"
          style={{
            height: 50,
            width: 170,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 4,
            paddingHorizontal: 10,
            color: '#000000',
            backgroundColor: '#ffffff',
          }}
          value={form.skill_name}
          onChangeText={value =>
            setForm(prevForm => ({...prevForm, skill_name: value}))
          }
        />
        <View style={{paddingTop: 1, paddingLeft: 10}}>
          <SmallButton label="Save" onPress={AddSkill} />
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
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
                display: 'flex',
                flexDirection: 'row',
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
              <View style={{paddingLeft: 5}}>
                <Text onPress={() => handleDeleteSkill(skill.id)}>x</Text>
              </View>
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default Skill;
