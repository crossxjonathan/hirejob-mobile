/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from '../../../css/card';
import Profile from '../../../assets/image/bg/profile1.png';
import Category from '../Category/Category';
import {useNavigation} from '@react-navigation/native';

const Card = ({item}) => {
  const navigation = useNavigation();
  const [skillsCount, setSkillsCount] = useState(0);

  const handleSkillsData = (skills) => {
    setSkillsCount(skills.length);
  };

  const PressDetail = () => {
    navigation.navigate('DetailWorker', {id: item.users_id});
  };

  return (
    <TouchableOpacity onPress={PressDetail} style={styles.CardContainer}>
      <View style={styles.CardData}>
        <View>
          <Image
            source={item.photo ? {uri: item.photo} : Profile}
            style={styles.CardProfile}
          />
        </View>
        <View>
          <Text style={styles.CardProfileName}>{item?.name}</Text>
          <Text style={styles.CardProfileJob}>{item?.description}</Text>
          <View style={styles.CategoryContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Category id={item.users_id} onSkillsData={handleSkillsData} />
              <Text style={{color: 'grey', fontWeight: '600'}}>
                +{skillsCount}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
