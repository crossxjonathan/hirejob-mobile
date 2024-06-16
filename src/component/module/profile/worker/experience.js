import {View, Text} from 'react-native';
import React from 'react';
import Textinput from '../../../base/text/textinput';
import TextField from '../../../base/text/textfield';
import MediumButton from '../../../base/button/mediumbutton';
import MediumButtonTransparent from '../../../base/button/mediumbuttontransparent';
import MediumTransparentYellow from '../../../base/button/mediumtransparentyellow';

const Experience = () => {
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        width: '100%',
        height: 600,
        borderRadius: 5,
      }}>
      <Text
        style={{
          color: '#000000',
          fontSize: 20,
          padding: 20,
          fontWeight: '600',
        }}>
        Experience
      </Text>
      <View
        style={{
          borderBottomColor: '#E2E5ED',
          borderBottomWidth: 1,
        }}
      />
      <View style={{padding: 20}}>
        <Text style={{color: '#aaaaaa', fontWeight: '600', paddingLeft: 10}}>
          Position
        </Text>
        <View style={{paddingTop: 30}}>
          <Textinput placeholder="Web Developer" />
        </View>
      </View>
      <View style={{padding: 20}}>
        <Text style={{color: '#aaaaaa', fontWeight: '600', paddingLeft: 10}}>
          Company Name
        </Text>
        <View style={{paddingTop: 30}}>
          <Textinput placeholder="PT Google Indonesia" />
        </View>
      </View>
      <View style={{padding: 20}}>
        <Text style={{color: '#aaaaaa', fontWeight: '600', paddingLeft: 10}}>
          Month/Year
        </Text>
        <View style={{paddingTop: 30}}>
          <Textinput placeholder="January 2024" />
        </View>
      </View>
      <View style={{padding: 20}}>
        <Text style={{color: '#aaaaaa', fontWeight: '600', paddingLeft: 10}}>
          Description
        </Text>
        <View style={{paddingTop: 60}}>
          <TextField placeholder="Description Your Job" />
        </View>
      </View>
      <View style={{alignItems: 'center', gap: 20}}>
        <View
          style={{
            borderBottomColor: '#E2E5ED',
            borderBottomWidth: 1,
            paddingTop: 60,
            width: '80%',
          }}
        />
        <MediumTransparentYellow label="Add Experience" />
      </View>
    </View>
  );
};

export default Experience;
