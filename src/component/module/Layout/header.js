import {View, Text, Image, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../../css/layout';
import vector from '../../../assets/image/bg/Vector1.png';
import notif from '../../../assets/image/icon/bell.png';
import Moment from 'react-moment';
import axios from 'axios';
import {API_URL} from '@env';

const Header = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dateToFormat = '2024-06-18T11:18-0500';

  const handleGetData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.get(`${API_URL}/workers/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      // console.log(response.data, '<<<<<<<<<<<<<<<<res');
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  if (loading) {
    return (
      <View style={styles.containerHeader}>
        <ActivityIndicator size="large" color="#0ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.containerHeader}>
        <Text>
          Error fetching data:{' '}
          {error.response ? JSON.stringify(error.response.data) : error.message}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.containerHeader}>
      <View style={{position: 'absolute'}}>
        <Text style={{paddingTop: 40, paddingLeft: 20, fontSize: 18}}>
          <Moment element={Text} format="ddd, D MMMM YYYY">
            {dateToFormat}
          </Moment>
        </Text>
        <Text style={{paddingTop: 10, paddingLeft: 18, fontSize: 20}}>
          Hello, {data.profile?.email} !!
        </Text>
      </View>
      <View style={{position: 'absolute', paddingLeft: 320, paddingTop: 20}}>
        <Image source={notif} style={{width: 20, height: 20}} />
      </View>
      <View>
        <Image
          source={vector}
          style={{zIndex: 2, width: '100%', height: 170}}
        />
      </View>
    </View>
  );
};

export default Header;
