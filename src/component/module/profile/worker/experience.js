import {View, Text, Alert, Image, ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Textinput from '../../../base/text/textinput';
import TextField from '../../../base/text/textfield';
import MediumTransparentYellow from '../../../base/button/mediumtransparentyellow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import office from '../../../../assets/image/icon/office.png';
import MediumTransparentRed from '../../../base/button/mediumtransparentred';
import SmallButtonRed from '../../../base/button/smallbuttonred';

const Experience = () => {
  const [exp, setExp] = useState([]);
  const [form, setForm] = useState({
    position: '',
    company: '',
    month: '',
    year: '',
    description: '',
  });
  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setForm({...form, [name]: value});
  };

  const formRef = useRef(form);
  formRef.current = form;

  const handleAddExperience = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const payload = {
        position: formRef.current.position,
        company_name: formRef.current.company,
        month_company: formRef.current.month,
        year_company: formRef.current.year,
        description_company: formRef.current.description,
      };

      const res = await axios.post(`${API_URL}/experience`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
      navigation.navigate('ProfileWorker');
      Alert.alert('Add Experience Successfully!!');
      console.log(data, '<<<<<<<<<<<<<<<<<data experience');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteExperience = async id => {
    try {
      console.log(id, '<<<<<<<<<<<<<<<<<delete id');
      const token = await AsyncStorage.getItem('token');
      const res = await axios.delete(`${API_URL}/experience/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
      setExp(prevExp => prevExp.filter(experience => experience.id !== id));
      console.log(data, '<<<<<<<<<<<<<delete');
      Alert.alert('Delete experience Successfully!!');
    } catch (error) {
      if (error.response) {
        console.log('Server responded with:', error.response.status);
        console.log(error.response.data);
        Alert.alert('Error', `Server responded with: ${error.response.status}`);
      } else if (error.request) {
        console.log('No response received:', error.request);
        Alert.alert('Error', 'No response received from the server.');
      } else {
        console.log('Error:', error.message);
        Alert.alert('Error', `An error occurred: ${error.message}`);
      }
    }
  };

  const getExperience = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const result = await axios.get(`${API_URL}/experience`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = result.data.data;
      setExp(data);
    } catch (error) {
      console.error('Error fetching experience:', error);
    }
  };

  useEffect(() => {
    getExperience();
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
        Experience
      </Text>
      <View
        style={{
          borderBottomColor: '#E2E5ED',
          borderBottomWidth: 1,
        }}
      />
      <View style={{padding: 10}}>
        <Text style={{color: '#aaaaaa', fontWeight: '600', paddingLeft: 10}}>
          Position
        </Text>
        <View style={{paddingTop: 10}}>
          <Textinput
            placeholder="Web Developer"
            value={form.position}
            onChangeText={value => handleChange('position', value)}
          />
        </View>
      </View>
      <View style={{padding: 10}}>
        <Text style={{color: '#aaaaaa', fontWeight: '600', paddingLeft: 10}}>
          Company Name
        </Text>
        <View style={{paddingTop: 10}}>
          <Textinput
            placeholder="PT Google Indonesia"
            value={form.company}
            onChangeText={value => handleChange('company', value)}
          />
        </View>
      </View>
      <View style={{padding: 10}}>
        <Text style={{color: '#aaaaaa', fontWeight: '600', paddingLeft: 10}}>
          Month
        </Text>
        <View style={{paddingTop: 10}}>
          <Textinput
            placeholder="January"
            value={form.month}
            onChangeText={value => handleChange('month', value)}
          />
        </View>
      </View>
      <View style={{padding: 10}}>
        <Text style={{color: '#aaaaaa', fontWeight: '600', paddingLeft: 10}}>
          Year
        </Text>
        <View style={{paddingTop: 10}}>
          <Textinput
            placeholder="2024"
            value={form.year}
            onChangeText={value => handleChange('year', value)}
          />
        </View>
      </View>
      <View style={{padding: 10}}>
        <Text style={{color: '#aaaaaa', fontWeight: '600', paddingLeft: 10}}>
          Description
        </Text>
        <View style={{paddingTop: 10}}>
          <TextField
            placeholder="Description Your Job"
            value={form.description}
            onChangeText={value => handleChange('description', value)}
          />
        </View>
      </View>
      <View style={{alignItems: 'center', gap: 20}}>
        <View
          style={{
            borderBottomColor: '#E2E5ED',
            borderBottomWidth: 1,
            paddingTop: 10,
            width: '80%',
          }}
        />
        <MediumTransparentYellow
          onPress={handleAddExperience}
          label="Add Experience"
        />
      </View>
      <ScrollView style={{padding: 20, gap: 50}}>
        {exp.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              gap: 20,
              marginBottom: 20,
            }}>
            <Image source={office} style={{width: 60, height: 60}} />
            <View>
              <Text style={{color: '#000000', fontSize: 20, fontWeight: '600'}}>
                {item.position || 'Position:'}
              </Text>
              <Text style={{color: '#46505C', fontSize: 14, fontWeight: '500'}}>
                {item.company_name || 'Company:'}
              </Text>
              <Text style={{color: '#9EA0A5', fontSize: 14, fontWeight: '500'}}>
                {item.month_company || 'Month'} {item.year_company || 'Year'}
              </Text>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontWeight: '300',
                  width: 180,
                }}>
                {item.description_company || 'Description:'}
              </Text>
              <View style={{paddingTop: 10}}>
                <SmallButtonRed
                  onPress={() => handleDeleteExperience(item.id)}
                  label="Delete"
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Experience;
