import {View, Text, TextInput} from 'react-native';
import React from 'react';
import Textinput from '../../base/text/textinput';
import SmallButton from '../../base/button/smallbutton';

const Skill = () => {
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        width: '100%',
        height: 150,
        borderRadius: 5,
      }}>
      <Text
        style={{
          color: '#000000',
          fontSize: 20,
          padding: 20,
          fontWeight: '600',
        }}>
        Skill
      </Text>
      <View
        style={{
          borderBottomColor: '#E2E5ED',
          borderBottomWidth: 1,
        }}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingTop: 15,
          paddingLeft: 20,
        }}>
        <TextInput
          placeholder="Java"
          placeholderTextColor="gray"
          style={{
            height: 50,
            width: 170,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 4,
            paddingHorizontal: 10,
            color: '#000000',
            backgroundColor: '#ffffff',
          }}
        />
        <View style={{paddingTop: 1, paddingLeft: 10}}>
          <SmallButton label="Simpan" />
        </View>
      </View>
    </View>
  );
};

export default Skill;
