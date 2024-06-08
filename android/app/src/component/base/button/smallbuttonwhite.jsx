import { View, Text, Pressable } from 'react-native';
import React from 'react';
import styles from '../../../../../css/button';

const SmallButtonWhite = ({label = ''}) => {
  return (
    <View style={styles.smallbuttonwhite}>
      <Pressable>
        <Text style={styles.buttonTextpurple}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default SmallButtonWhite;