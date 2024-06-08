import { View, Text, Pressable } from 'react-native';
import React from 'react';
import styles from '../../../css/button';

const LargeButtonTransparent = ({label = "" }) => {
  return (
    <View style={styles.largebuttontransparent}>
    <Pressable>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  </View>
  )
}

export default LargeButtonTransparent