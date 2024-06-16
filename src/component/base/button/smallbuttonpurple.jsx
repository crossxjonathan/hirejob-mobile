import {View, Text, Pressable} from 'react-native';
import React from 'react';
import styles from '../../../../../css/button';

const SmallButtonPurple = ({label = ''}) => {
  return (
    <View style={styles.smallbuttonpurple}>
      <Pressable>
        <Text style={styles.buttonText}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default SmallButtonPurple;
