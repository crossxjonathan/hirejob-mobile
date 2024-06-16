import {View, Text, Pressable} from 'react-native';
import React from 'react';
import styles from '../../../css/button';

const LargeButtonPurple = ({label = '', onPress, style}) => {
  return (
    <View style={{style}}>
      <Pressable style={styles.largebuttonpurple} onPress={onPress}>
        <Text style={styles.buttonText}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default LargeButtonPurple;
