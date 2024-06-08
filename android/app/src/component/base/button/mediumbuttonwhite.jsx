import { View, Text, Pressable } from 'react-native';
import React from 'react';
import styles from '../../../../../css/button';

const MediumButtonWhite = ({label = ''}) => {
  return (
    <View style={styles.mediumbuttonwhite}>
      <Pressable>
        <Text style={styles.buttonTextpurple}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default MediumButtonWhite;