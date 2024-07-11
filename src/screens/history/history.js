import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImageDefault from '../../assets/image/bg/profile1.png';
import NoInbox from '../../assets/image/icon/inbox.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';

const HistoryWorker = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const Navigation = useNavigation();
  const [hire, setHire] = useState([]);

  const handleGethireworker = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`${API_URL}/hire/workers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHire(res.data.data);
      console.log('Get Hire Data Success!!', res.data.data);
    } catch (error) {
      console.log('Error Fetching Data Hire:', error.message);
    }
  };

  const handleGethirerecruiter = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`${API_URL}/hire/recruiters`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHire(res.data.data);
      console.log('Get Hire Data Success!!', res.data.data);
    } catch (error) {
      console.log('Error Fetching Data Hire:', error.message);
    }
  };

  const handleChat = () => {
    Alert.alert('Chat');
    Navigation.navigate('ChatPage');
  };

  const textlimit = (text, limit) => {
    if (text && text.length > limit) {
      return text.substring(0, limit) + '....';
    }
    return text;
  };

  const formatDate = dateString => {
    const options = {day: '2-digit', month: '2-digit'};
    return new Date(dateString).toLocaleDateString('id-GB', options);
  };

  useEffect(() => {
    handleGethireworker();
    handleGethirerecruiter();
  }, []);

  return (
    <ScrollView style={{padding: 20}}>
      <Text style={styles.H1}>Inbox</Text>
      {hire.length > 0 ? (
        hire.map((item, index) => (
          <TouchableOpacity
            onPress={handleChat}
            key={item.id || index}
            style={styles.hireContainer}>
            <View style={styles.hireInfo}>
              <Image
                source={item.photo ? {uri: item.photo} : ImageDefault}
                style={styles.image}
              />
              <View>
                <Text style={styles.h2}>{item.hire_name || 'Name:'}</Text>
                <Text style={styles.p}>
                  {textlimit(item.hire_description, 20) || 'Description:'}
                </Text>
              </View>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.p}>{formatDate(item.created_at)}</Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.noInboxContainer}>
          <Image source={NoInbox} style={styles.noInboxImage} />
          <Text style={styles.h2}>Inbox Unavailable</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  H1: {
    fontFamily: 'OpenSans-VariableFont_wdth,wght',
    fontSize: 42,
    fontWeight: 'bold',
    color: '#46505C',
    marginBottom: 20,
  },
  h2: {
    fontFamily: 'OpenSans-VariableFont_wdth,wght',
    fontSize: 18,
    fontWeight: '800',
    color: '#000000',
  },
  p: {
    fontFamily: 'OpenSans-VariableFont_wdth,wght',
    fontSize: 14,
    fontWeight: '800',
    color: '#46505C',
  },
  hireContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
  },
  hireInfo: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 2,
    marginRight: 20,
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  noInboxContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  noInboxImage: {
    width: 200,
    height: 200,
  },
});

export default HistoryWorker;
