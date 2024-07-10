/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import image1 from '../../../../assets/image/bg/Rectangle637.png';
import office from '../../../../assets/image/icon/office.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';

const WorkerOption = () => {
  const [exp, setExp] = useState([]);
  const [port, setPort] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('Portfolio');
  const underlineAnim = useRef(new Animated.Value(0)).current;
  const route = useRoute();
  const {id} = route.params || {};

  const handleTabPress = tab => {
    setActiveTab(tab);
    Animated.spring(underlineAnim, {
      toValue: tab === 'Portfolio' ? 0 : 1,
      useNativeDriver: false,
    }).start();
  };

  const fetchData = async (endpoint, setState) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const url = id
        ? `${API_URL}/${endpoint}/${id}`
        : `${API_URL}/${endpoint}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setState(result.data.data);
      setLoading(false);
      setError('');
    } catch (error) {
      console.error(
        `Error fetching ${endpoint}:`,
        error.response?.data || error.message,
      );
      Alert.alert('Error', error.response?.data?.message || error.message);
      setLoading(false);
      setError(error.response?.data?.message || `Fetching ${endpoint} Failure`);
    }
  };

  useEffect(() => {
    fetchData('experience', setExp);
    fetchData('portfolio', setPort);
  }, [id]);

  const bufferToString = buffer => {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  };

  const renderPortfolio = () => (
    <ScrollView style={{padding: 20}}>
      {loading ? (
        <Text
          style={{
            color: '#ffffff',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 18,
          }}>
          Loading...
        </Text>
      ) : error ? (
        <Text
          style={{
            color: '#ffffff',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 18,
          }}>
          Error: {error}
        </Text>
      ) : port.length === 0 ? (
        <Text
          style={{
            color: '#000000',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 18,
          }}>
          No Portfolio Found
        </Text>
      ) : (
        port.map((portfolio, index) => {
          const imageUrl = portfolio.upload_image?.data
            ? bufferToString(portfolio.upload_image.data)
            : null;

          return (
            <View key={index} style={{marginBottom: 20}}>
              <Image
                source={imageUrl ? {uri: imageUrl} : image1}
                style={{
                  width: 250,
                  height: 300,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: '#FBB017',
                  marginBottom: 10,
                }}
              />
              <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
                {portfolio.application_name || 'application_name:'}
              </Text>
              <Text style={{color: 'black', fontSize: 15, fontWeight: '500'}}>
                {portfolio.type_portfolio || 'type_portfolio:'}
              </Text>
              <Text style={{color: '#FBB017', fontSize: 13, fontWeight: '400'}}>
                {portfolio.link_repository || 'link_repository:'}
              </Text>
            </View>
          );
        })
      )}
    </ScrollView>
  );

  const renderExperience = () => (
    <ScrollView style={{padding: 20, gap: 50}}>
      {loading ? (
        <Text
          style={{
            color: '#0000FF',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 18,
          }}>
          Loading...
        </Text>
      ) : error ? (
        <Text
          style={{
            color: '#FF0000',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 18,
          }}>
          Error: {error}
        </Text>
      ) : exp.length === 0 ? (
        <Text
          style={{
            color: '#000000',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 18,
          }}>
          No Experience Found
        </Text>
      ) : (
        exp.map((experience, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              gap: 20,
              marginBottom: 20,
            }}>
            <Image source={office} style={{width: 60, height: 60}} />
            <View>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 20,
                  fontWeight: '600',
                  width: 200,
                }}>
                {experience.position || 'Position:'}
              </Text>
              <Text style={{color: '#46505C', fontSize: 14, fontWeight: '500'}}>
                {experience.company_name || 'Company:'}
              </Text>
              <Text style={{color: '#9EA0A5', fontSize: 14, fontWeight: '500'}}>
                {experience.month_company || 'Month'}{' '}
                {experience.year_company || 'Year'}
              </Text>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontWeight: '300',
                  width: 180,
                }}>
                {experience.description_company || 'Description:'}
              </Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );

  return (
    <View
      style={{
        paddingTop: 20,
        paddingLeft: 20,
        backgroundColor: '#ffffff',
        height: '100%',
        borderRadius: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <TouchableOpacity onPress={() => handleTabPress('Portfolio')}>
          <Text
            style={{
              color: activeTab === 'Portfolio' ? '#000000' : '#aaaaaa',
              fontSize: 20,
              fontWeight: '700',
            }}>
            Portfolio
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Experience')}>
          <Text
            style={{
              color: activeTab === 'Experience' ? '#000000' : '#aaaaaa',
              fontSize: 20,
              fontWeight: '700',
            }}>
            Experience
          </Text>
        </TouchableOpacity>
      </View>
      <Animated.View
        style={{
          borderBottomColor: '#5E50A1',
          borderBottomWidth: 5,
          width: '50%',
          alignSelf: activeTab === 'Portfolio' ? 'flex-start' : 'flex-end',
          marginBottom: 20,
        }}
      />
      {activeTab === 'Portfolio' ? renderPortfolio() : renderExperience()}
    </View>
  );
};

export default WorkerOption;
