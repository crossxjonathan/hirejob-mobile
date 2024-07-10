/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, ScrollView, ActivityIndicator, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../component/module/Layout/header';
import Card from '../../component/module/Card/Card';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });
  const navigation = useNavigation();

  const handleGetAllData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.get(`${API_URL}/workers`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const workers = response.data.data;
      if (params.page === 1) {
        setData(workers || []);
      } else {
        setData(prevData => [...prevData, ...workers]);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    handleGetAllData();
  }, [handleGetAllData, params.page]);

  const handleScroll = ({nativeEvent}) => {
    const paddingToBottom = 20;
    const isCloseToBottom =
      nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
      nativeEvent.contentSize.height - paddingToBottom;

    if (isCloseToBottom && !loadingMore) {
      setLoadingMore(true);
      setParams(prevParams => ({
        ...prevParams,
        page: prevParams.page + 1,
      }));
    }
  };

  if (loading && params.page === 1) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#5E50A1" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Error fetching data</Text>
      </View>
    );
  }

  const renderLoader = () => {
    return (
      loadingMore && (
        <View style={{paddingVertical: 20}}>
          <ActivityIndicator size="large" color="#5E50A1" />
        </View>
      )
    );
  };

  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      onScroll={handleScroll}
      scrollEventThrottle={16}>
      <Header />
      <View style={{padding: 20, gap: 15}} navigation={navigation}>
        {data.map((item, index) => (
          <Card key={index} item={item} />
        ))}
        {renderLoader()}
      </View>
    </ScrollView>
  );
};

export default Home;
