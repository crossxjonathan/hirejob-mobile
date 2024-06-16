import {View, TextInput, Image} from 'react-native';
import React, {useState} from 'react';
import list from '../../../assets/image/icon/list.png';
import search from '../../../assets/image/icon/searchicon.png';

const SearchContainer = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={{padding: 20, flexDirection: 'row', gap: 10}}>
      <View
        style={{
          backgroundColor: '#ffffff',
          width: '80%',
          height: 50,
          borderRadius: 5,
          paddingLeft: 15,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={search}
          style={{width: 20, height: 20, marginRight: 10}}
        />
        <TextInput
          style={{flex: 1, color: '#000000'}}
          placeholder="Android Developer"
          placeholderTextColor="#aaaaaa"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <View
        style={{
          backgroundColor: '#ffffff',
          width: '20%',
          height: 50,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={list} style={{width: 30, height: 30}} />
      </View>
    </View>
  );
};

export default SearchContainer;
