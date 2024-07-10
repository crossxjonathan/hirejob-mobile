import {View, Text, SafeAreaView, Image, ImageBackground} from 'react-native';
import React from 'react';
import WhiteLogo from '../../assets/image/logo/white.png';
import styles from '../../css/landingpage';
import LargeButtonWhite from '../../component/base/button/largebuttonwhite';
import LargeButtonTransparent from '../../component/base/button/largebuttontransparent';
import {useNavigation} from '@react-navigation/native';

const LandingPage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/image/bg/bglandingpage.png')}
        style={styles.backgroundImage}
      />
      <View
        style={{
          backgroundColor: 'rgba(94, 80, 161, 0.8)',
          width: 400,
          height: 800,
          zIndex: 2,
        }}>
        <View style={{padding: 20}}>
          <Image
            style={{width: 120, height: 30, zIndex: 4}}
            source={WhiteLogo}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.text}>
            Find talented & best developers in various areas of expertise
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            gap: 5,
            paddingLeft: 25,
            position: 'relative',
          }}>
          <LargeButtonWhite
            label="Login Worker"
            onPress={() => navigation.navigate('LoginWorker')}
          />
          <View style={{flexDirection: 'row'}}>
            <View style={styles.line} />
            <Text style={styles.textsm}>OR</Text>
            <View style={styles.line} />
          </View>
          <LargeButtonTransparent
            label="Login Recruiter"
            onPress={() => navigation.navigate('LoginRecruiter')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LandingPage;
