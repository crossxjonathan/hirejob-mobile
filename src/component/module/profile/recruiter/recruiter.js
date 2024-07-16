import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Profile from '../../../../assets/image/bg/profile1.png';
import Edit from '../../../../assets/image/icon/edit.png';
import Location from '../../../../assets/image/icon/map.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '@env';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';

const MainRecruiterProfile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newPhoto, setNewPhoto] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    requestCameraPermission();
    handleGetProfile();
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera.',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const handleGetProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const res = await axios.get(`${API_URL}/recruiters/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(res.data.profile);
      setLoading(false);
      setError('');
      console.log('Profile data fetched successfully:', res.data.profile);
    } catch (error) {
      console.error(
        'Error fetching profile:',
        error.response?.data || error.message,
      );
      Alert.alert('Error', error.response?.data?.message || error.message);
      setLoading(false);
      setError('Fetching Profile Failure');
    }
  };

  const handleEditPhoto = () => {
    Alert.alert(
      'Select Photo',
      'Choose a method to set your profile photo',
      [
        {
          text: 'Camera',
          onPress: () => handleTakePhoto(),
        },
        {
          text: 'Select File',
          onPress: () => handleSelectPhoto(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  const handleSelectPhoto = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
        Alert.alert('Error', 'Image picker error');
      } else if (response.assets && response.assets.length > 0) {
        const selectedPhoto = response.assets[0];
        setNewPhoto({
          uri: selectedPhoto.uri,
          fileName: selectedPhoto.fileName,
          type: selectedPhoto.type,
        });
      }
    });
  };

  const handleTakePhoto = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorCode);
        Alert.alert('Error', 'Camera error');
      } else if (response.assets && response.assets.length > 0) {
        const selectedPhoto = response.assets[0];
        setNewPhoto({
          uri: selectedPhoto.uri,
          fileName: selectedPhoto.fileName,
          type: selectedPhoto.type,
        });
      }
    });
  };

  const handleUploadProfile = async () => {
    if (!newPhoto) {
      Alert.alert('Error', 'Please select or take a photo first');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const formData = new FormData();
      formData.append('photo', {
        uri: newPhoto.uri,
        name: newPhoto.fileName,
        type: newPhoto.type,
      });

      const res = await axios.put(
        `${API_URL}/recruiters/profile/photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      setProfile(prevProfile => ({
        ...prevProfile,
        photo: res.data.photo,
      }));
      navigation.navigate('ProfileRecruiter');
      Alert.alert('Success', 'Profile photo updated successfully');
    } catch (error) {
      console.error(
        'Error uploading profile photo:',
        error.response?.data || error.message,
      );
      Alert.alert('Error', error.response?.data?.message || error.message);
    }
  };

  return (
    <View>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingTop: 40,
          gap: 15,
          backgroundColor: '#ffffff',
          height: 350,
          borderRadius: 10,
        }}>
        <Image
          source={
            profile.photo && typeof profile.photo === 'string'
              ? {uri: profile.photo}
              : Profile
          }
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            borderColor: '#673ab7',
            borderWidth: 2,
          }}
        />
        <TouchableOpacity onPress={handleEditPhoto}>
          <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
            <Image source={Edit} style={{width: 20, height: 20}} />
            <Text style={{color: '#aaaaaa', fontSize: 20, fontWeight: '600'}}>
              Edit
            </Text>
          </View>
        </TouchableOpacity>
        {newPhoto && (
          <TouchableOpacity onPress={handleUploadProfile}>
            <Text
              style={{
                color: '#FBB017',
                fontSize: 18,
                fontWeight: '600',
                position: 'relative',
                bottom: 14,
                left: 2,
              }}>
              Upload Photo
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          position: 'absolute',
          paddingTop: 200,
          paddingLeft: 20,
          gap: 10,
        }}>
        <Text style={{color: '#000000', fontSize: 20, fontWeight: '600'}}>
          {profile.name || 'Company:....'}
        </Text>
        <Text style={{color: '#1F2A36', fontSize: 14, fontWeight: '400'}}>
          {profile.position || 'Position:....'}
        </Text>
        <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
          <Image source={Location} style={{width: 20, height: 20}} />
          <Text style={{color: '#aaaaaa', fontWeight: '400'}}>
            {profile.city || 'City:....'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MainRecruiterProfile;
