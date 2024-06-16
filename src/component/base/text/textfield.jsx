import {View, TextInput} from 'react-native';
import React from 'react';
import styles from '../../../css/input';

const TextField = ({placeholder}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.TextField}
        placeholder={placeholder}
        placeholderTextColor="#999999"
        multiline={true}
        scrollEnabled={true}
        numberOfLines={4}
      />
    </View>
  );
};

export default TextField;
