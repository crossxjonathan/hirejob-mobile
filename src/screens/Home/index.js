import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import Header from '../../component/module/Layout/header';
import Card from '../../component/module/Card/Card';

const Home = () => {
  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <Header />
      <View style={{padding: 20, gap: 15}}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </View>
    </ScrollView>
  );
};

export default Home;
