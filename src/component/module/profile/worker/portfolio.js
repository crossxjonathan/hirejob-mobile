import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import Textinput from '../../../base/text/textinput';
import styles from '../../../../css/profile';
import cloud from '../../../../assets/image/icon/cloud1.png';
import size from '../../../../assets/image/icon/size.png';
import imageIcon from '../../../../assets/image/icon/image.png';
import MediumTransparentYellow from '../../../base/button/mediumtransparentyellow';
import {useNavigation} from '@react-navigation/native';
import {API_URL} from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import image1 from '../../../../assets/image/bg/Rectangle637.png';
import MediumTransparentRed from '../../../base/button/mediumtransparentred';
import MediumTransparentBlue from '../../../base/button/mediumtransparentblue';

const Portfolio = () => {
  const [port, setPort] = useState([]);
  const [form, setForm] = useState({
    appName: '',
    linkRepository: '',
    portfolioType: 'mobile',
    photo: '',
  });

  const navigation = useNavigation();
  const formRef = useRef(form);

  const handleChange = (name, value) => {
    setForm({...form, [name]: value});
    formRef.current = {...formRef.current, [name]: value};
  };

  const handleImagePick = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        const resizedImage = await ImageResizer.createResizedImage(
          uri,
          800,
          600,
          'JPEG',
          80,
        );
        handleChange('photo', resizedImage.uri);
      }
    });
  };

  const handleAddPortfolio = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const payload = {
        application_name: formRef.current.appName,
        link_repository: formRef.current.linkRepository,
        type_portfolio: formRef.current.portfolioType,
        upload_image: formRef.current.photo,
      };

      const resPortfolio = await axios.post(`${API_URL}/portfolio`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const portfolioData = resPortfolio.data;
      console.log(portfolioData, '<<<<<<<<<<<<<<<<<data portfolio');

      if (portfolioData && formRef.current.photo) {
        const formData = new FormData();
        formData.append('photo', {
          uri: formRef.current.photo,
          type: 'image/jpeg',
          name: 'portfolio.jpg',
        });

        const resImage = await axios.post(`${API_URL}/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        const imageData = resImage.data;
        console.log(imageData, '<<<<<<<<<<<<<<<<<data portfolio image');
        Alert.alert('Success', 'Portfolio and Image Uploaded Successfully!');
      } else {
        Alert.alert('Success', 'Portfolio added, but no image to upload.');
      }
    } catch (error) {
      if (error.response) {
        console.log('Server responded with:', error.response.status);
        console.log(error.response.data);
        Alert.alert('Error', `Server responded with: ${error.response.status}`);
      } else if (error.request) {
        console.log('No response received:', error.request);
        Alert.alert('Error', 'No response received from the server.');
      } else {
        console.log('Error:', error.message);
        Alert.alert('Error', `An error occurred: ${error.message}`);
      }
    }
  };

  const handleDeletePortfolio = async id => {
    try {
      console.log(id, '<<<<<<<<<<<<<<<<<delete id');
      const token = await AsyncStorage.getItem('token');
      const res = await axios.delete(`${API_URL}/portfolio/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
      setPort(prevPort => prevPort.filter(portfolio => portfolio.id !== id));
      console.log(data, '<<<<<<<<<<<<<delete');
      Alert.alert('Delete portfolio Successfully!!');
    } catch (error) {
      if (error.response) {
        console.log('Server responded with:', error.response.status);
        console.log(error.response.data);
        Alert.alert('Error', `Server responded with: ${error.response.status}`);
      } else if (error.request) {
        console.log('No response received:', error.request);
        Alert.alert('Error', 'No response received from the server.');
      } else {
        console.log('Error:', error.message);
        Alert.alert('Error', `An error occurred: ${error.message}`);
      }
    }
  };

  const getPortfolio = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const result = await axios.get(`${API_URL}/portfolio`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = result.data.data;
      console.log('Portfolio Data:', data);
      setPort(data);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    }
  };

  const bufferToString = buffer => {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  };

  useEffect(() => {
    getPortfolio();
  }, []);

  return (
    <View style={styles.containerPortfolio}>
      <Text style={styles.titlePortfolio}>Portfolio</Text>
      <View style={styles.underline} />
      <View style={styles.subProfile}>
        <Text style={styles.titleapp}>Application Name</Text>
        <View style={styles.spacetitleapp}>
          <Textinput
            placeholder="Enter Application Name"
            value={form.appName}
            onChangeText={value => handleChange('appName', value)}
          />
        </View>
      </View>
      <View style={styles.subProfile}>
        <Text style={styles.linkrepotitle}>Link Repository</Text>
        <View style={styles.spacelinkrepotitle}>
          <Textinput
            placeholder="Enter Link Repository"
            value={form.linkRepository}
            onChangeText={value => handleChange('linkRepository', value)}
          />
        </View>
      </View>
      <View style={styles.radioContainer}>
        <Text style={styles.label}>Type Portfolio</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => handleChange('portfolioType', 'Mobile Application')}>
            <View
              style={
                form.portfolioType === 'Mobile Application'
                  ? styles.radioSelected
                  : styles.radioUnselected
              }
            />
            <Text
              style={
                form.portfolioType === 'Mobile Application'
                  ? styles.radioTextSelected
                  : styles.radioTextUnselected
              }>
              Mobile Application
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => handleChange('portfolioType', 'Web Application')}>
            <View
              style={
                form.portfolioType === 'Web Application'
                  ? styles.radioSelected
                  : styles.radioUnselected
              }
            />
            <Text
              style={
                form.portfolioType === 'Web Application'
                  ? styles.radioTextSelected
                  : styles.radioTextUnselected
              }>
              Web Application
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subProfileUpload}>
        <Text style={styles.titleupload}>Upload Image</Text>
        <TouchableOpacity
          onPress={handleImagePick}
          style={styles.containerUpload}>
          <View style={styles.uploadfile}>
            <Image source={cloud} style={styles.uploadcloud} />
            <Text style={styles.uploadfiletext}>Upload File From Storage</Text>
          </View>
          <View style={styles.uploadsubcontainer}>
            <View style={styles.highres}>
              <Image source={size} style={styles.highresimage} />
              <Text style={styles.texthighres}>
                High-Res Image PNG, JPG or GIF
              </Text>
            </View>
            <View style={styles.sizebox}>
              <Image source={imageIcon} style={styles.sizeimage} />
              <Text style={styles.textsize}>Size 1080x1920 or 600x800</Text>
            </View>
          </View>
        </TouchableOpacity>
        {form.photo ? (
          <View style={styles.imagePreviewContainer}>
            <Text style={styles.imagePreviewText}>Image Preview:</Text>
            <Image
              source={{uri: form.photo}}
              style={styles.previewImage}
              resizeMode="cover"
            />
          </View>
        ) : null}
      </View>
      <View style={{paddingTop: 30, paddingLeft: 20, width: '90%', gap: 10}}>
        <View style={styles.underline} />
        <View style={{padding: 10}}>
          <MediumTransparentYellow
            onPress={handleAddPortfolio}
            label="Add Work Portfolio"
          />
        </View>
      </View>
      <ScrollView style={{padding: 20}}>
        {port.map((item, index) => {
          const imageUrl = item.upload_image?.data
            ? bufferToString(item.upload_image.data)
            : null;

          return (
            <View
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: 20,
                alignItems: 'center',
              }}>
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
                {item.application_name || 'application_name:'}
              </Text>
              <Text style={{color: 'black', fontSize: 15, fontWeight: '500'}}>
                {item.type_portfolio || 'type_portfolio:'}
              </Text>
              <Text style={{color: '#FBB017', fontSize: 13, fontWeight: '400'}}>
                {item.link_repository || 'link_repository:'}
              </Text>
              <View style={{padding: 10}}>
                <MediumTransparentRed
                  onPress={() => handleDeletePortfolio(item.id)}
                  label="Delete"
                />
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Portfolio;
