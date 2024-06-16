import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import PurpleLogo from '../../../assets/image/logo/purple.png';
import styles from '../../../css/auth';
import TextRegisterWorker from '../../../component/module/auth/registerworker';

const RegisterWorker = () => {
  return (
    <ScrollView>
      <View>
        <View
          style={{backgroundColor: '#F6F7F8', width: '100%', height: '100%'}}>
          <View style={{padding: 20}}>
            <Image style={{width: 120, height: 30}} source={PurpleLogo} />
          </View>
          <View style={{padding: 20}}>
            <Text style={styles.text}>Signup</Text>
            <Text style={styles.smtext}>Register Worker In Here...</Text>
          </View>
          <View style={{paddingTop: 20}}>
            <TextRegisterWorker />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterWorker;
