import {View, Text} from 'react-native';
import React from 'react';

const SkillBase = () => {
  return (
    <View
      style={{
        backgroundColor: '#FBB017',
        width: '100%',
        height: 30,
        paddingTop: 3,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 5,
      }}>
      <Text
        style={{
          color: '#ffffff',
          textAlign: 'center',
          fontWeight: '600',
          fontSize: 18,
        }}>
        SkillBase
      </Text>
    </View>
  );
};

export default SkillBase;
