import {View, Text, Pressable} from 'react-native';
import React from 'react';
import styles from '../../../css/button';

const SmallButton = ({label = '', onPress}) => {
  return (
    <View style={styles.smallbutton}>
      <Pressable onPress={onPress}>
        <Text style={styles.buttonText}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default SmallButton;
