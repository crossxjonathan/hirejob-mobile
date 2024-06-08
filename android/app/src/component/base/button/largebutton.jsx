import { View, Text, Pressable } from 'react-native';
import React from 'react';
import styles from '../../../../../css/button';

const LargeButton = ({label = ''}) => {
  return (
    <View style={styles.largebutton}>
      <Pressable>
        <Text style={styles.buttonText}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default LargeButton;