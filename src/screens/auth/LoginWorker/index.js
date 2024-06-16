import {View, Text, Image} from 'react-native';
import React from 'react';
import PurpleLogo from '../../../assets/image/logo/purple.png';
import styles from '../../../css/auth';
import TextLoginWorker from '../../../component/module/auth/loginworker';

const LoginWorker = () => {
  return (
    <View style={{backgroundColor: '#F6F7F8', width: '100%', height: '100%'}}>
      <View style={{padding: 20}}>
        <Image style={{width: 120, height: 30}} source={PurpleLogo} />
      </View>
      <View style={{padding: 20}}>
        <Text style={styles.text}>Login</Text>
        <Text style={styles.smtext}>
          Let's Find Your Favorite Job In Here...
        </Text>
      </View>
      <View style={{paddingTop: 100}}>
        <TextLoginWorker />
      </View>
    </View>
  );
};

export default LoginWorker;
