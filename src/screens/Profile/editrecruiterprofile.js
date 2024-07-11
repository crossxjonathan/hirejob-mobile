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
import MainRecruiterProfile from '../../component/module/profile/recruiter/recruiter';
import PersonalDataRecruiter from '../../component/module/profile/recruiter/personaldatarecruiter';
import ReactAlert from '../../component/module/alert/alert';

const EditRecruiterProfile = ({id}) => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    company: '',
    position: '',
    city: '',
    description: '',
    linkedin: '',
    phone: '',
    instagram: '',
  });

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertConfirmText, setAlertConfirmText] = useState('OK');

  const showAlert = (title, message, confirmText) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertConfirmText(confirmText);
    setAlertVisible(true);
  };

  const formRef = useRef(form);
  formRef.current = form;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${API_URL}/recruiters/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.profile;
        console.log(data, '<<<<<<<<<<data');
        setForm({
          company: data.company,
          position: data.position,
          city: data.city,
          description: data.description,
          linkedin: data.linkedin,
          phone: data.phone,
          instagram: data.instagram,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        // Alert.alert('Error', 'Failed to fetch data');
        showAlert(
          'Failed to fetch data!',
          error.response?.data?.message || error.message,
          'Try Again',
        );
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        // Alert.alert('Error', 'No token found');
        showAlert('Error', 'No token found', 'Proceed');
        return;
      }

      const payload = {
        company: formRef.current.company,
        position: formRef.current.position,
        city: formRef.current.city,
        linkedin: formRef.current.linkedin,
        instagram: formRef.current.instagram,
        phone: formRef.current.phone,
        description: formRef.current.description,
      };

      // console.log('Payload:', payload);

      const response = await axios.put(
        `${API_URL}/recruiters/profile`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200 && response.data.status === 'Success') {
        navigation.navigate('ProfileRecruiter');
        // Alert.alert('Success', 'Profile updated successfully');
        showAlert('Success', 'Profile updated successfully', 'Proceed');
      } else {
        // Alert.alert('Error', 'Failed to save data');
        showAlert('Error', 'Failed to save data', 'Proceed');
      }

      console.log('Response from API:', response.data);
    } catch (error) {
      console.error('Error saving data:', error);
      // Alert.alert('Error', 'Failed to save data');
      showAlert('Error', 'Failed to save data', 'Proceed');
    }
  };

  const CancelButton = () => {
    navigation.navigate('ProfileRecruiter');
  };

  return (
    <ScrollView>
      <View style={{padding: 20, gap: 20}}>
        <MainRecruiterProfile />
        <View style={{padding: 10, gap: 10}}>
          <LargeButtonPurple label="Save" onPress={handleSave} />
          <LargeTransparentPurple label="Cancel" onPress={CancelButton} />
        </View>
        <View>
          <PersonalDataRecruiter form={form} setForm={setForm} />
        </View>
        <ReactAlert
          visible={alertVisible}
          onClose={() => setAlertVisible(false)}
          title={alertTitle}
          message={alertMessage}
          confirmText={alertConfirmText}
          onConfirm={() => setAlertVisible(false)}
        />
        {/* <View>
          <Skill />
        </View>
        <View>
          <Experience />
        </View>
        <View>
          <Portfolio />
        </View> */}
      </View>
    </ScrollView>
  );
};

export default EditRecruiterProfile;
