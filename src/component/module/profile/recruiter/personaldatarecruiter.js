import {View, Text} from 'react-native';
import React from 'react';
import Textinput from '../../../base/text/textinput';
import TextField from '../../../base/text/textfield';

const PersonalDataRecruiter = ({form, setForm}) => {
  const handleChange = (name, value) => {
    setForm({...form, [name]: value});
  };

  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        width: '100%',
        height: 800,
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
        <Text style={{color: '#aaaaaa', fontWeight: '600'}}>Company Name</Text>
        <View style={{paddingTop: 30}}>
          <Textinput
            placeholder="Enter Your Company Name..."
            value={form.company}
            onChangeText={value => handleChange('company', value)}
          />
        </View>
      </View>
      <View style={{padding: 20}}>
        <Text style={{color: '#aaaaaa', fontWeight: '600'}}>Sector</Text>
        <View style={{paddingTop: 30}}>
          <Textinput
            placeholder="Enter Job Title"
            value={form.position}
            onChangeText={value => handleChange('position', value)}
          />
        </View>
      </View>
      <View style={{padding: 20}}>
        <Text style={{color: '#aaaaaa', fontWeight: '600'}}>City</Text>
        <View style={{paddingTop: 30}}>
          <Textinput
            placeholder="Enter city"
            value={form.city}
            onChangeText={value => handleChange('city', value)}
          />
        </View>
      </View>
      <View style={{padding: 20}}>
        <Text style={{color: '#aaaaaa', fontWeight: '600'}}>Linked in</Text>
        <View style={{paddingTop: 30}}>
          <Textinput
            placeholder="Enter Your Linked in"
            value={form.linkedin}
            onChangeText={value => handleChange('linkedin', value)}
          />
        </View>
      </View>
      <View style={{padding: 20}}>
        <Text style={{color: '#aaaaaa', fontWeight: '600'}}>Instagram</Text>
        <View style={{paddingTop: 30}}>
          <Textinput
            placeholder="Enter Your Instagram"
            value={form.instagram}
            onChangeText={value => handleChange('instagram', value)}
          />
        </View>
      </View>
      <View style={{padding: 20}}>
        <Text style={{color: '#aaaaaa', fontWeight: '600'}}>Phone Number</Text>
        <View style={{paddingTop: 30}}>
          <Textinput
            placeholder="Enter Your Phone Number"
            value={form.phone}
            onChangeText={value => handleChange('phone', value)}
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

export default PersonalDataRecruiter;
