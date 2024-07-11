import {View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import Input from '../../base/text/input';
import LargeButton from '../../base/button/largebutton';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {API_URL} from '@env';
import ReactAlert from '../alert/alert';

const TextRegisterRecruiter = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    phone: '',
    password: '',
    confirm: '',
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

  const handleRegister = async () => {
    if (form.password !== form.confirm) {
      showAlert('Password not match!!', 'Please try again');
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/users/register/recruiters`,
        form,
      );
      console.log(res.data);
      showAlert('Success!!', 'Register Recruiter Successfully!!', 'Proceed');
      navigation.navigate('LoginRecruiter');
    } catch (error) {
      const messageErr =
        error.response?.data?.message || 'Something went wrong!';
      console.log(error);
      showAlert('Something Went Wrong!', messageErr, 'Try Again');
    }
  };

  return (
    <View>
      <View>
        <Text
          style={{color: 'gray', position: 'relative', bottom: 10, left: 20}}>
          Name
        </Text>
        <Input
          onChangeText={value => setForm({...form, name: value})}
          value={form.name}
          placeholder="Enter Your Fullname..."
        />
      </View>
      <View style={{paddingTop: 50}}>
        <Text
          style={{color: 'gray', position: 'relative', bottom: 10, left: 20}}>
          Email
        </Text>
        <Input
          onChangeText={value => setForm({...form, email: value})}
          value={form.email}
          placeholder="Enter Your Email Address..."
        />
      </View>
      <View style={{paddingTop: 50}}>
        <Text
          style={{color: 'gray', position: 'relative', bottom: 10, left: 20}}>
          Company
        </Text>
        <Input
          onChangeText={value => setForm({...form, company: value})}
          value={form.company}
          placeholder="Enter Your Company Name..."
        />
      </View>
      <View style={{paddingTop: 50}}>
        <Text
          style={{color: 'gray', position: 'relative', bottom: 10, left: 20}}>
          Position
        </Text>
        <Input
          onChangeText={value => setForm({...form, position: value})}
          value={form.position}
          placeholder="Enter Your Position In Company..."
        />
      </View>
      <View style={{paddingTop: 50}}>
        <Text
          style={{color: 'gray', position: 'relative', bottom: 10, left: 20}}>
          Phone
        </Text>
        <Input
          onChangeText={value => setForm({...form, phone: value})}
          value={form.phone}
          placeholder="Enter Your Phone Number..."
          keyboardType="numeric"
        />
      </View>
      <View style={{paddingTop: 50}}>
        <Text
          style={{color: 'gray', position: 'relative', bottom: 10, left: 20}}>
          Password
        </Text>
        <Input
          onChangeText={value => setForm({...form, password: value})}
          value={form.password}
          placeholder="Enter Your Password..."
          secureTextEntry={true}
        />
      </View>
      <View style={{paddingTop: 50}}>
        <Text
          style={{color: 'gray', position: 'relative', bottom: 10, left: 20}}>
          Confirm
        </Text>
        <Input
          onChangeText={value => setForm({...form, confirm: value})}
          value={form.confirm}
          placeholder="Re-type Your Password..."
          secureTextEntry={true}
        />
      </View>
      <View style={{padding: 30}}>
        <LargeButton label="Sign Up" onPress={handleRegister} />
        <Text
          style={{
            color: '#000000',
            paddingTop: 20,
            fontSize: 15,
            paddingLeft: 10,
          }}>
          Already have an account?{' '}
          <Text
            style={{color: '#FBB017'}}
            onPress={() => navigation.navigate('LoginRecruiter')}>
            Sign in here
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

export default TextRegisterRecruiter;
