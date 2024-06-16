import {View, TextInput, Text} from 'react-native';
import React, {useState} from 'react';
import styles from '../../../css/input';

const Textinput = ({
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
        style={styles.textinput}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default Textinput;
