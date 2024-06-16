import {View, Text, Pressable} from 'react-native';
import React from 'react';
import styles from '../../../css/button';

const MediumButtonPurple = ({label = ''}) => {
  return (
    <View style={styles.mediumbuttonpurple}>
      <Pressable>
        <Text style={styles.buttonText}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default MediumButtonPurple;
