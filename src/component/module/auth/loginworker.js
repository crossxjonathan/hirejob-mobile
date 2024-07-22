import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Input from '../../base/text/input';
import LargeButton from '../../base/button/largebutton';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';
import ReactAlert from '../alert/alert';

const TextLoginWorker = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertConfirmText, setAlertConfirmText] = useState('OK');

  const navigation = useNavigation();

  const showAlert = (title, message, confirmText) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertConfirmText(confirmText);
    setAlertVisible(true);
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/users/login`, form);
      const {data} = res.data;
      showAlert('Welcome!!', 'Login successful', 'Proceed');
      await AsyncStorage.setItem('token', data.token);

      const roleRes = await axios.get(`${API_URL}/users/check-role`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      const userRole = roleRes.data.role;

      if (userRole === 'recruiter') {
        navigation.navigate('RecruiterTab');
      } else {
        navigation.navigate('MainTab');
      }
    } catch (error) {
      const status = error.response.status;
      let messageErr = 'Invalid email or password. Please try again.';
      if (status === 400) {
        messageErr = 'Incorrect email or password.';
      }
      showAlert('Something Went Wrong!', messageErr, 'Try Again');
    }
  };

  return (
    <View>
      <View>
        <Text
          style={{color: 'gray', position: 'relative', bottom: 40, left: 20}}>
          Email
        </Text>
        <Input
          onChangeText={value => setForm({...form, email: value})}
          value={form.email}
          placeholder="Enter Your Email Address..."
        />
      </View>
      <View style={{paddingTop: 100}}>
        <Text
          style={{color: 'gray', position: 'relative', bottom: 40, left: 20}}>
          Password
        </Text>
        <Input
          onChangeText={value => setForm({...form, password: value})}
          value={form.password}
          placeholder="Enter Your Password..."
          secureTextEntry={true}
        />
      </View>
      <Text
        style={{
          color: '#000000',
          paddingTop: 50,
          paddingRight: 20,
          textAlign: 'right',
        }}>
        Forget Password?
      </Text>
      <View style={{padding: 30}}>
        <LargeButton label="Sign In" onPress={handleLogin} />
        <Text style={{color: '#000000', paddingTop: 20, fontSize: 15}}>
          You don't have an account yet?{' '}
          <Text
            style={{color: '#FBB017'}}
            onPress={() => navigation.navigate('RegisterWorker')}>
            Register here
          </Text>
        </Text>
      </View>
      <ReactAlert
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        title={alertTitle}
        message={alertMessage}
        confirmText={alertConfirmText}
        onConfirm={() => setAlertVisible(false)}
      />
    </View>
  );
};

export default TextLoginWorker;
