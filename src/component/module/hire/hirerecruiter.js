import {View, Text, Alert, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Input from '../../base/text/input';
import LargeButton from '../../base/button/largebutton';
import Textinput from '../../base/text/textinput';
import ReactAlert from '../alert/alert';
import { TextInput } from 'react-native';

const HireTextWorker = ({handleAddHire, loading}) => {
  const [form, setForm] = useState({
    message_purpose: '',
    name: '',
    email: '',
    phone: '',
    description: '',
  });

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertConfirmText, setAlertConfirmText] = useState('OK');

  const showAlert = (title, message, confirmText) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertConfirmText(confirmText);
    setAlertVisible(true);
  };

  const onSubmit = () => {
    if (
      !form.message_purpose ||
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.description
    ) {
      // Alert.alert('All fields are required!');
      showAlert('Failed!!', 'All fields are required!', 'Proceed');
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
          style={styles.TextField}
          placeholder="Enter Your Description..."
          placeholderTextColor="#999999"
          multiline={true}
          numberOfLines={4}
        />
      </View>
      <View style={styles.buttonContainer}>
        <LargeButton label="Hire" onPress={onSubmit} disabled={loading} />
      </View>
      <ReactAlert
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        title={alertTitle}
        message={alertMessage}
        confirmText={alertConfirmText}
        onConfirm={() => setAlertVisible(false)}
      />
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
    position: 'relative',
    right: 10,
  },
  buttonContainer: {
    paddingTop: 30,
    alignItems: 'center',
  },
  TextField: {
    width: 330,
    height: 100,
    borderColor: 'gray',
    color: '#000000',
    borderRadius: 4,
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top',
    backgroundColor: '#ffffff',
    position: 'relative',
    right: 25,
  },
});

export default HireTextWorker;
