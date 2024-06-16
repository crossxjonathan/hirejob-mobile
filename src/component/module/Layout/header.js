import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from '../../../css/layout';
import vector from '../../../assets/image/bg/Vector1.png';
import notif from '../../../assets/image/icon/bell.png';

const Header = () => {
  return (
    <View style={styles.containerHeader}>
      <View style={{position: 'absolute'}}>
        <Text style={{paddingTop: 40, paddingLeft: 20, fontSize: 18}}>
          Mon, 10 June 2024
        </Text>
        <Text style={{paddingTop: 10, paddingLeft: 18, fontSize: 28}}>Hello, John Doe!</Text>
      </View>
      <View style={{position: 'absolute', paddingLeft: 320, paddingTop: 20}}>
        <Image source={notif} style={{width: 20, height: 20}} />
      </View>
      <View>
        <Image
          source={vector}
          style={{zIndex: 2, width: '100%', height: 170}}
        />
      </View>
    </View>
  );
};

export default Header;
