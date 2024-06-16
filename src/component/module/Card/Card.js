import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from '../../../css/card';
import Profile from '../../../assets/image/bg/profile1.png';
import Category from '../Category/Category';

const Card = () => {
  return (
    <View style={styles.CardContainer}>
      <View style={styles.CardData}>
        <View>
          <Image source={Profile} style={styles.CardProfile} />
        </View>
        <View>
          <Text style={styles.CardProfileName}>John Doe</Text>
          <Text style={styles.CardProfileJob}>Web Developer</Text>
          <View style={styles.CategoryContainer}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 20,
                justifyContent: 'center',
              }}>
              <Category />
              <Text style={{color: 'grey', padding: 3, fontWeight: '600'}}>
                +5
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;
