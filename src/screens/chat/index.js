import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const ChatPage = () => {
  return (
    <View style={styles.hireContainer}>
      <Text style={styles.h1}>Chat</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontFamily: 'OpenSans-VariableFont_wdth,wght',
    fontSize: 42,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  hireContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#5E50A1',
    marginBottom: 20,
    padding: 20,
  },
});

export default ChatPage;
