import {View, Text} from 'react-native';
import React from 'react';
import Textinput from '../../../base/text/textinput';
import TextField from '../../../base/text/textfield';

const PersonalData = ({form, setForm}) => {
  const handleChange = (name, value) => {
    setForm({...form, [name]: value});
  };

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
        Personal Data
      </Text>
      <View
        style={{
          borderBottomColor: '#E2E5ED',
          borderBottomWidth: 1,
        }}
      />
      <View style={{padding: 20}}>
        <Text style={{color: '#aaaaaa', fontWeight: '600'}}>Full Name</Text>
        <View style={{paddingTop: 30}}>
          <Textinput
            placeholder="Enter Your Full Name..."
            value={form.fullname}
            onChangeText={value => handleChange('fullname', value)}
          />
        </View>
      </View>
      <View style={{padding: 20}}>
        <Text style={{color: '#aaaaaa', fontWeight: '600'}}>Job Title</Text>
        <View style={{paddingTop: 30}}>
          <Textinput
            placeholder="Enter Job Title"
            value={form.job}
            onChangeText={value => handleChange('job', value)}
          />
        </View>
      </View>
      <View style={{padding: 20}}>
        <Text style={{color: '#aaaaaa', fontWeight: '600'}}>Domicile</Text>
        <View style={{paddingTop: 30}}>
          <Textinput
            placeholder="Enter Domicile"
            value={form.domicile}
            onChangeText={value => handleChange('domicile', value)}
          />
        </View>
      </View>
      <View style={{padding: 20}}>
        <Text style={{color: '#aaaaaa', fontWeight: '600'}}>Company</Text>
        <View style={{paddingTop: 30}}>
          <Textinput
            placeholder="Enter Your Company"
            value={form.company}
            onChangeText={value => handleChange('company', value)}
          />
        </View>
      </View>
      <View style={{padding: 20}}>
        <Text style={{color: '#aaaaaa', fontWeight: '600'}}>Description</Text>
        <View style={{paddingTop: 55}}>
          <TextField
            placeholder="Enter Short Description"
            value={form.description}
            onChangeText={value => handleChange('description', value)}
          />
        </View>
      </View>
    </View>
  );
};

export default PersonalData;
