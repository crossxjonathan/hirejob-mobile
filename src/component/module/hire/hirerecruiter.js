import {View, Text, Alert, StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import Input from '../../base/text/input';
import LargeButton from '../../base/button/largebutton';

const HireTextWorker = ({handleAddHire, loading}) => {
  const [form, setForm] = useState({
    message_purpose: '',
    name: '',
    email: '',
    phone: '',
    description: '',
  });

  const onSubmit = () => {
    if (
      !form.message_purpose ||
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.description
    ) {
      Alert.alert('All fields are required!');
      return;
    }
    handleAddHire(form);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Message Purpose</Text>
        <Input
          onChangeText={value => setForm({...form, message_purpose: value})}
          value={form.message_purpose}
          placeholder="Enter Your Message Purpose..."
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Fullname</Text>
        <Input
          onChangeText={value => setForm({...form, name: value})}
          value={form.name}
          placeholder="Enter Your Fullname..."
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <Input
          onChangeText={value => setForm({...form, email: value})}
          value={form.email}
          placeholder="Enter Your Email Address..."
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone</Text>
        <Input
          onChangeText={value => setForm({...form, phone: value})}
          value={form.phone}
          placeholder="Enter Your Phone Number..."
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          onChangeText={value => setForm({...form, description: value})}
          value={form.description}
          placeholder="Enter Your Description..."
          placeholderTextColor="#999999"
          style={styles.textField}
          multiline={true}
          numberOfLines={4}
        />
      </View>
      <View style={styles.buttonContainer}>
        <LargeButton label="Hire" onPress={onSubmit} disabled={loading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    paddingTop: 30,
  },
  label: {
    color: 'gray',
    marginBottom: 10,
    marginLeft: 10,
  },
  textField: {
    height: 150,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#000000',
    backgroundColor: '#ffffff',
    textAlignVertical: 'top',
  },
  buttonContainer: {
    paddingTop: 30,
  },
});

export default HireTextWorker;
