import {View, Text, Pressable} from 'react-native';
import React from 'react';
import styles from '../../../css/button';

const MediumTransparentYellow = ({label = ''}) => {
  return (
    <View style={styles.mediumtransparentyellow}>
      <Pressable>
        <Text style={styles.buttonTextYellow}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default MediumTransparentYellow;
