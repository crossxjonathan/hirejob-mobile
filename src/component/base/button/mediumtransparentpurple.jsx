import {View, Text, Pressable} from 'react-native';
import React from 'react';
import styles from '../../../../../css/button';

const MediumTransparentPurple = ({label = ''}) => {
  return (
    <View style={styles.mediumtransparentpurple}>
      <Pressable>
        <Text style={styles.buttonTextpurple}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default MediumTransparentPurple;
