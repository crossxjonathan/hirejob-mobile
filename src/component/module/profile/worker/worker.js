import {View, Text, Image} from 'react-native';
import React from 'react';
import Profile from '../../../../assets/image/bg/profile1.png';
import Edit from '../../../../assets/image/icon/edit.png';
import Location from '../../../../assets/image/icon/map.png';

const MainWorkerProfile = () => {
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
          source={Profile}
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            border: '2px solid #000000',
          }}
        />
        <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
          <Image source={Edit} style={{width: 20, height: 20}} />
          <Text style={{color: '#aaaaaa', fontSize: 20, fontWeight: '600'}}>
            Edit
          </Text>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          paddingTop: 200,
          paddingLeft: 20,
          gap: 10,
        }}>
        <Text style={{color: '#000000', fontSize: 20, fontWeight: '600'}}>
          John Doe
        </Text>
        <Text style={{color: '#1F2A36', fontSize: 14, fontWeight: '400'}}>
          Web Developer
        </Text>
        <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
          <Image source={Location} style={{width: 20, height: 20}} />
          <Text style={{color: '#aaaaaa', fontWeight: '400'}}>
            Purwokerto, Jawa Tengah
          </Text>
        </View>
        <Text style={{color: '#aaaaaa', fontSize: 14, fontWeight: '500'}}>
          Freelancer
        </Text>
      </View>
    </View>
  );
};

export default MainWorkerProfile;
