import {View, Text, Pressable} from 'react-native';
import React from 'react';
import styles from '../../../css/button';

const MediumTransparentBlue = ({label = '', onPress}) => {
  return (
    <View style={styles.mediumtransparentblue}>
      <Pressable onPress={onPress}>
        <Text style={styles.buttonTextBlue}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default MediumTransparentBlue;
