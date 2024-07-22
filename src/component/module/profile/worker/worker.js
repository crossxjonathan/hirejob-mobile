import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from 'react-native';
import Profile from '../../../../assets/image/bg/profile1.png';
import Edit from '../../../../assets/image/icon/edit.png';
import Location from '../../../../assets/image/icon/map.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '@env';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';

const MainWorkerProfile = () => {
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

      const res = await axios.get(`${API_URL}/workers/profile`, {
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
        `${API_URL}/workers/profile/photo`,
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
      navigation.navigate('ProfileWorker');
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
      <View style={styles.profileContainer}>
        <Image
          source={
            newPhoto
              ? {uri: newPhoto.uri}
              : profile.photo
              ? {uri: profile.photo}
              : Profile
          }
          style={styles.profileImage}
        />
        <TouchableOpacity onPress={handleEditPhoto}>
          <View style={styles.editPhotoContainer}>
            <Image source={Edit} style={styles.editIcon} />
            <Text style={styles.editText}>Edit</Text>
          </View>
        </TouchableOpacity>
        {newPhoto && (
          <TouchableOpacity onPress={handleUploadProfile}>
            <Text style={styles.uploadText}>Upload Photo</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.profileDetailsContainer}>
        <Text style={styles.profileName}>{profile.name || 'Name:....'}</Text>
        <Text style={styles.profileJob}>{profile.job_desk || 'Job:....'}</Text>
        <View style={styles.profileLocationContainer}>
          <Image source={Location} style={styles.locationIcon} />
          <Text style={styles.profileLocation}>
            {profile.domicile || 'Location:....'}
          </Text>
        </View>
        <Text style={styles.profileWorkplace}>
          {profile.workplace || 'Workplace:....'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 40,
    gap: 15,
    backgroundColor: '#ffffff',
    height: 350,
    borderRadius: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#000000',
  },
  editPhotoContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  editText: {
    color: '#aaaaaa',
    fontSize: 20,
    fontWeight: '600',
  },
  uploadText: {
    color: '#FBB017',
    fontSize: 18,
    fontWeight: '600',
    position: 'relative',
    bottom: 14,
    left: 2,
  },
  profileDetailsContainer: {
    position: 'absolute',
    paddingTop: 200,
    paddingLeft: 20,
    gap: 10,
  },
  profileName: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '600',
  },
  profileJob: {
    color: '#1F2A36',
    fontSize: 14,
    fontWeight: '400',
  },
  profileLocationContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  locationIcon: {
    width: 20,
    height: 20,
  },
  profileLocation: {
    color: '#1F2A36',
    fontSize: 14,
    fontWeight: '400',
  },
  profileWorkplace: {
    color: '#1F2A36',
    fontSize: 14,
    fontWeight: '400',
  },
});

export default MainWorkerProfile;
