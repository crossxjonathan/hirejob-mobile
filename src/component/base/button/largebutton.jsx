import { View, Text, Pressable } from 'react-native';
import React from 'react';
import styles from '../../../css/button';

const LargeButton = ({label = '', onPress}) => {
  return (
    <View>
      <Pressable style={styles.largebutton} onPress={onPress}>
        <Text style={styles.buttonText}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default LargeButton;