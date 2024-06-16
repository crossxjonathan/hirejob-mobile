import {View, Text, Pressable} from 'react-native';
import React from 'react';
import styles from '../../../css/button';

const LargeTransparentPurple = ({label = '', onPress}) => {
  return (
    <View>
      <Pressable style={styles.largetransparentpurple} onPress={onPress}>
        <Text style={styles.buttonTextpurple}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default LargeTransparentPurple;
