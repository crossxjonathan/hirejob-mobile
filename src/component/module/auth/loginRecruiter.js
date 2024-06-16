import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Input from '../../base/text/input';
import LargeButton from '../../base/button/largebutton';
import {useNavigation} from '@react-navigation/native';

const TextLoginRecruiter = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    console.log(form);
  };

  const navigation = useNavigation();

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
        <LargeButton
          label="Sign In"
          onPress={() => {
            handleLogin();
            navigation.navigate('MainTab');
          }}
        />
        <Text style={{color: '#000000', paddingTop: 20, fontSize: 15}}>
          You don't have an account yet?{' '}
          <Text
            style={{color: '#FBB017'}}
            onPress={() => navigation.navigate('RegisterRecruiter')}>
            Register here
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default TextLoginRecruiter;
