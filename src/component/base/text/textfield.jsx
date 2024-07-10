import {View, TextInput} from 'react-native';
import React from 'react';
import styles from '../../../css/input';

const TextField = ({placeholder, value, onChangeText}) => {
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
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default TextField;
