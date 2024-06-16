import {View, Text, Pressable} from 'react-native';
import React from 'react';
import styles from '../../../../../css/button';

const SmallButtonTransparent = ({label = ''}) => {
  return (
    <View style={styles.smallbuttontransparent}>
      <Pressable>
        <Text style={styles.buttonText}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default SmallButtonTransparent;
