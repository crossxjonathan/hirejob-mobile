import { View, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import search from '../../../assets/image/icon/searchicon.png';
import { Image } from 'react-native';

const SearchContainer = ({ searchText, setSearchText, selectedValue, setSelectedValue }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Image source={search} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor="#aaaaaa"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <RNPickerSelect
        onValueChange={(value) => setSelectedValue(value)}
        items={[
          { label: 'A - Z', value: 'asc' },
          { label: 'Z - A', value: 'desc' },
        ]}
        placeholder={{
          label: 'Select sort',
          value: null,
        }}
        style={pickerSelectStyles}
        value={selectedValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'column',
    gap: 10,
  },
  searchBox: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingLeft: 15,
    marginBottom: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#000000',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: '#333',
    paddingRight: 30,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  placeholder: {
    color: '#aaa',
  },
  iconContainer: {
    top: 15,
    right: 15,
  },
});

export default SearchContainer;
