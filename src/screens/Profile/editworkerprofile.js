import {ScrollView, View, Alert} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import MainWorkerProfile from '../../component/module/profile/worker/worker';
import LargeButtonPurple from '../../component/base/button/largebuttonpurple';
import LargeTransparentPurple from '../../component/base/button/largetransparentpurple';
import PersonalData from '../../component/module/profile/worker/personaldata';
import Skill from '../../component/module/Skill/skill';
import Experience from '../../component/module/profile/worker/experience';
import Portfolio from '../../component/module/profile/worker/portfolio';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const EditWorkerProfile = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    fullname: '',
    job: '',
    domicile: '',
    company: '',
    description: '',
  });

  const formRef = useRef(form);
  formRef.current = form;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${API_URL}/workers/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.profile;
        console.log(data, '<<<<<<<<<<data');
        setForm({
          fullname: data.name,
          job: data.job_desk,
          domicile: data.domicile,
          company: data.workplace,
          description: data.description,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No token found');
        return;
      }

      const payload = {
        name: formRef.current.fullname,
        job_desk: formRef.current.job,
        domicile: formRef.current.domicile,
        workplace: formRef.current.company,
        description: formRef.current.description,
      };

      // console.log('Payload:', payload);

      const response = await axios.put(`${API_URL}/workers/profile`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data.status === 'Success') {
        navigation.navigate('ProfileWorker');
        Alert.alert('Success', 'Profile updated successfully');
      } else {
        Alert.alert('Error', 'Failed to save data');
      }

      console.log('Response from API:', response.data);
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'Failed to save data');
    }
  };

  const CancelButton = () => {
    navigation.navigate('ProfileWorker');
  };

  return (
    <ScrollView>
      <View style={{padding: 20, gap: 20}}>
        <MainWorkerProfile />
        <View style={{padding: 10, gap: 10}}>
          <LargeButtonPurple label="Save" onPress={handleSave} />
          <LargeTransparentPurple label="Cancel" onPress={CancelButton} />
        </View>
        <View>
          <PersonalData form={form} setForm={setForm} />
        </View>
        <View>
          <Skill />
        </View>
        <View>
          <Experience />
        </View>
        <View>
          <Portfolio />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditWorkerProfile;