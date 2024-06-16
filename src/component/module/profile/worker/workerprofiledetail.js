import {View, Text, Image} from 'react-native';
import React from 'react';
import Profile from '../../../../assets/image/bg/profile1.png';
import Location from '../../../../assets/image/icon/map.png';
import LargeButtonPurple from '../../../base/button/largebuttonpurple';
import SkillContainer from '../../Skill/skillcontainer';

const WorkerProfileDetail = () => {
  return (
    <View>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingTop: 40,
          gap: 15,
          backgroundColor: '#ffffff',
          height: 700,
          borderRadius: 10,
        }}>
        <Image
          source={Profile}
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            border: '2px solid #000000',
          }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          paddingTop: 150,
          paddingLeft: 20,
          gap: 10,
        }}>
        <Text style={{color: '#000000', fontSize: 20, fontWeight: '600'}}>
          John Doe
        </Text>
        <Text style={{color: '#1F2A36', fontSize: 14, fontWeight: '400'}}>
          Web Developer
        </Text>
        <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
          <Image source={Location} style={{width: 20, height: 20}} />
          <Text style={{color: '#aaaaaa', fontWeight: '400'}}>
            Purwokerto, Jawa Tengah
          </Text>
        </View>
        <Text style={{color: '#aaaaaa', fontSize: 14, fontWeight: '500'}}>
          Freelancer
        </Text>
        <Text
          style={{
            color: '#aaaaaa',
            fontSize: 16,
            fontWeight: '500',
            paddingBottom: 20,
            textAlign: 'left',
          }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos labore
          dignissimos laudantium ab laboriosam natus fugit est voluptatibus, non
          cumque, illum pariatur, tempore voluptas facilis consequatur incidunt
          architecto placeat dolorum?
        </Text>
        <View style={{position: 'relative', right: 10, paddingBottom: 20}}>
          <LargeButtonPurple label="Hire" />
        </View>
        <View>
          <Text style={{color: '#000000', fontSize: 20, fontWeight: '600'}}>
            Skill
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flex: 1,
              flexWrap: 'wrap',
              gap: 10,
              paddingTop: 10,
            }}>
            <SkillContainer />
            <SkillContainer />
            <SkillContainer />
            <SkillContainer />
            <SkillContainer />
            <SkillContainer />
            <SkillContainer />
            <SkillContainer />
          </View>
        </View>
      </View>
    </View>
  );
};

export default WorkerProfileDetail;
