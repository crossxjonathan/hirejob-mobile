import { View, Text, Pressable } from 'react-native';
import React from 'react';
import styles from '../../../../../css/button';

const MediumButton = ({label = ''}) => {
  return (
    <View style={styles.mediumbutton}>
      <Pressable>
        <Text style={styles.buttonText}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default MediumButton;