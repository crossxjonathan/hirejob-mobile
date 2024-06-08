import { View, Text, SafeAreaView, Image, ImageBackground } from 'react-native';
import React from 'react';
import WhiteLogo from "./assets/image/logo/white.png";
import styles from "./android/app/src/css/landingpage";
import LargeButtonWhite from './android/app/src/component/base/button/largebuttonwhite';
import LargeButtonTransparent from './android/app/src/component/base/button/largebuttontransparent';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={require("./assets/image/bg/bglandingpage.png")} style={styles.backgroundImage} />
      <View style={{ backgroundColor: 'rgba(94, 80, 161, 0.8)', width: 400, height: 800 }}>
        <View style={{ padding: 20 }}>
          <Image style={{ width: 120, height: 30, zIndex: 4 }} source={WhiteLogo} />
        </View>
        <View style={styles.title}>
          <Text style={styles.text}>Find talented & best developers in various areas of expertise</Text>
        </View>
        <View style={{ display: "flex", gap: 5, paddingLeft: 25 }}>
          <LargeButtonWhite
            label='Login Worker'
          />
          <View style={{flexDirection: 'row'}}>
          <View style={styles.line} />
          <Text style={styles.textsm}>OR</Text>
          <View style={styles.line} />
          </View>
          <LargeButtonTransparent
            label='Login Recruiter'
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
