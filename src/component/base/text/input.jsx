import {View, TextInput, Text} from 'react-native';
import React, {useState} from 'react';
import styles from '../../../css/input';

const Input = ({
  placeholder,
  onChangeText,
  value,
  secureTextEntry,
  keyboardType,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="gray"
        style={styles.input}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default Input;
