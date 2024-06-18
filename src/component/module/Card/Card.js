import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from '../../../css/card';
import Profile from '../../../assets/image/bg/profile1.png';
import Category from '../Category/Category';

const Card = ({item}) => {
  const imageProfile = item?.imageUrl ? {uri: item.imageUrl} : Profile;

  return (
    <View style={styles.CardContainer}>
      <View style={styles.CardData}>
        <View>
          <Image source={imageProfile} style={styles.CardProfile} />
        </View>
        <View>
          <Text style={styles.CardProfileName}>{item?.name}</Text>
          <Text style={styles.CardProfileJob}>{item?.description}</Text>
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
