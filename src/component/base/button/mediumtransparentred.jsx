import {View, Text, Pressable} from 'react-native';
import React from 'react';
import styles from '../../../css/button';

const MediumTransparentRed = ({label = '', onPress}) => {
  return (
    <View style={styles.mediumtransparentred}>
      <Pressable onPress={onPress}>
        <Text style={styles.buttonTextRed}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default MediumTransparentRed;
