import React, {useState} from 'react';
import {View, Text, Image, ScrollView, StyleSheet, Alert} from 'react-native';
import PurpleLogo from '../../assets/image/logo/purple.png';
import HireTextWorker from '../../component/module/hire/hirerecruiter';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import ReactAlert from '../../component/module/alert/alert';

const HireWorker = ({route}) => {
  const [hire, setHire] = useState({});
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const id = route.params?.id;

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

  const handleAddHire = async form => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const workers_id = id;
      // console.log(token, '<<<<<<<<<<<<<<<<<<<<<<<<token');
      // console.log(workers_id, '<<<<<<<<<<<<<<<<<<<<<<<<workers_id');
      const formData = {...form, workers_id};
      console.log(formData, '<<<<<<<<<<<<<<<<<<<<<<<<formData');

      const res = await axios.post(`${API_URL}/hire`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data.data;
      setHire({...hire, data});
      // console.log(res, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<res');
      // console.log(data, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<res');
      setLoading(false);
      showAlert(
        'Success',
        'Hiring request submitted successfully!!',
        'Proceed',
      );
      // Alert.alert('Success', 'Hiring request submitted successfully!');
      navigation.goBack('');
    } catch (error) {
      setLoading(false);
      console.error('Error adding hire:', error.response);
      showAlert(
        'Error',
        'Failed to submit hiring request. Please try again.',
        'Proceed',
      );
      // Alert.alert(
      //   'Error',
      //   'Failed to submit hiring request. Please try again.',
      // );
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.logo} source={PurpleLogo} />
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>Contact Person</Text>
          <Text style={styles.smtext}>
            Let's send the message for hiring...
          </Text>
        </View>
        <View style={styles.hireContainer}>
          <HireTextWorker handleAddHire={handleAddHire} loading={loading} />
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#F6F7F8',
    width: '100%',
    height: '100%',
  },
  container: {
    padding: 20,
  },
  header: {
    paddingBottom: 20,
  },
  logo: {
    width: 120,
    height: 30,
  },
  content: {
    paddingBottom: 20,
  },
  text: {
    fontFamily: 'OpenSans-VariableFont_wdth,wght',
    fontSize: 42,
    fontWeight: 'bold',
    color: '#46505C',
  },
  smtext: {
    fontFamily: 'OpenSans-VariableFont_wdth,wght',
    fontSize: 18,
    fontWeight: '600',
    color: '#858D96',
  },
  hireContainer: {
    paddingTop: 0,
  },
});

export default HireWorker;
