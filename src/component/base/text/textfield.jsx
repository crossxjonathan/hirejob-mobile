import {View, TextInput} from 'react-native';
import React from 'react';
import styles from '../../../css/input';

const TextField = ({placeholder, value}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.TextField}
        placeholder={placeholder}
        placeholderTextColor="#999999"
        multiline={true}
        scrollEnabled={true}
        numberOfLines={4}
        value={value}
      />
    </View>
  );
};

export default TextField;
