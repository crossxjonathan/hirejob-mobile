import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Card from '../../component/module/Card/Card';
import axios from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import SearchContainer from '../../component/module/Search/search';

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: '',
    sort: null,
  });

  const navigation = useNavigation();

  const sortData = (data, sortType) => {
    if (sortType === 'asc') {
      return data.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else if (sortType === 'desc') {
      return data.sort((a, b) => (a.name > b.name ? -1 : 1));
    }
    return data;
  };

  const handleGetAllData = async () => {
    // console.log('Fetching data with params:', params);
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
      let workers = response.data.data;
      workers = sortData(workers, params.sort);
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
  }, [params.page, params.search, params.sort]);

  const handleScroll = ({ nativeEvent }) => {
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

  const handleSearchTextChange = (text) => {
    setParams(prevParams => ({
      ...prevParams,
      search: text,
      page: 1,
    }));
  };

  const handleSortChange = (value) => {
    setParams(prevParams => ({
      ...prevParams,
      sort: value,
      page: 1,
    }));
  };

  if (loading && params.page === 1) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5E50A1" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error fetching data</Text>
      </View>
    );
  }

  const renderLoader = () => {
    return (
      loadingMore && (
        <View style={{ paddingVertical: 20 }}>
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
      <SearchContainer
        searchText={params.search}
        setSearchText={handleSearchTextChange}
        selectedValue={params.sort}
        setSelectedValue={handleSortChange}
      />
      <View style={{ padding: 20, gap: 15 }} navigation={navigation}>
        {data.map((item, index) => (
          <Card key={index} item={item} />
        ))}
        {renderLoader()}
      </View>
    </ScrollView>
  );
};

export default SearchPage;
