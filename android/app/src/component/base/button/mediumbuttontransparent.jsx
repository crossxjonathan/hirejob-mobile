import { View, Text, Pressable } from 'react-native';
import React from 'react';
import styles from '../../../../../css/button';

const MediumButtonTransparent = ({label = "" }) => {
  return (
    <View style={styles.mediumbuttontransparent}>
    <Pressable>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  </View>
  )
}

export default MediumButtonTransparent