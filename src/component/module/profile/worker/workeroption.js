import {View, Text, Image, TouchableOpacity, Animated} from 'react-native';
import React, {useState, useRef} from 'react';
import image1 from '../../../../assets/image/bg/Rectangle637.png';
import image2 from '../../../../assets/image/bg/Rectangle638.png';
import image3 from '../../../../assets/image/bg/Rectangle639.png';
import image4 from '../../../../assets/image/bg/Rectangle640.png';
import image5 from '../../../../assets/image/bg/Rectangle641.png';
import image6 from '../../../../assets/image/bg/Rectangle642.png';
import office from '../../../../assets/image/icon/office.png';

const WorkerOption = () => {
  const [activeTab, setActiveTab] = useState('Portfolio');
  const underlineAnim = useRef(new Animated.Value(0)).current;

  const handleTabPress = tab => {
    setActiveTab(tab);
    Animated.spring(underlineAnim, {
      toValue: tab === 'Portfolio' ? 0 : 1,
      useNativeDriver: false,
    }).start();
  };

  const renderPortfolio = () => (
    <View style={{padding: 20, gap: 20}}>
      <Image
        source={image1}
        style={{width: 250, height: 200, borderRadius: 10}}
      />
      <Image
        source={image2}
        style={{width: 250, height: 200, borderRadius: 10}}
      />
      <Image
        source={image3}
        style={{width: 250, height: 200, borderRadius: 10}}
      />
      <Image
        source={image4}
        style={{width: 250, height: 200, borderRadius: 10}}
      />
      <Image
        source={image5}
        style={{width: 250, height: 200, borderRadius: 10}}
      />
      <Image
        source={image6}
        style={{width: 250, height: 200, borderRadius: 10}}
      />
    </View>
  );

  const renderExperience = () => (
    <View style={{padding: 20, gap: 50}}>
      <View style={{display: 'flex', flexDirection: 'row', gap: 20}}>
        <Image source={office} style={{width: 60, height: 60}} />
        <View>
          <Text style={{color: '#000000', fontSize: 25, fontWeight: '600'}}>
            Engineer
          </Text>
          <Text style={{color: '#46505C', fontSize: 17, fontWeight: '500'}}>
            Tokopedia
          </Text>
          <Text style={{color: '#9EA0A5', fontSize: 15, fontWeight: '500'}}>
            July 2019 - January 2020
          </Text>
          <Text style={{color: '#9EA0A5', fontSize: 15, fontWeight: '500'}}>
            6 months
          </Text>
          <Text
            style={{
              color: '#000000',
              fontSize: 13,
              fontWeight: '300',
              width: 200,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            erat orci, mollis nec gravida sed, ornare quis urna. Curabitur eu
            lacus fringilla, vestibulum risus at.
          </Text>
        </View>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', gap: 20}}>
        <Image source={office} style={{width: 60, height: 60}} />
        <View>
          <Text style={{color: '#000000', fontSize: 25, fontWeight: '600'}}>
            Engineer
          </Text>
          <Text style={{color: '#46505C', fontSize: 17, fontWeight: '500'}}>
            Tokopedia
          </Text>
          <Text style={{color: '#9EA0A5', fontSize: 15, fontWeight: '500'}}>
            July 2019 - January 2020
          </Text>
          <Text style={{color: '#9EA0A5', fontSize: 15, fontWeight: '500'}}>
            6 months
          </Text>
          <Text
            style={{
              color: '#000000',
              fontSize: 13,
              fontWeight: '300',
              width: 200,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            erat orci, mollis nec gravida sed, ornare quis urna. Curabitur eu
            lacus fringilla, vestibulum risus at.
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View
      style={{
        paddingTop: 20,
        paddingLeft: 20,
        backgroundColor: '#ffffff',
        height: '100%',
        borderRadius: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <TouchableOpacity onPress={() => handleTabPress('Portfolio')}>
          <Text
            style={{
              color: activeTab === 'Portfolio' ? '#000000' : '#aaaaaa',
              fontSize: 20,
              fontWeight: '700',
            }}>
            Portfolio
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Experience')}>
          <Text
            style={{
              color: activeTab === 'Experience' ? '#000000' : '#aaaaaa',
              fontSize: 20,
              fontWeight: '700',
            }}>
            Experience
          </Text>
        </TouchableOpacity>
      </View>
      <Animated.View
        style={{
          borderBottomColor: '#5E50A1',
          borderBottomWidth: 5,
          width: '50%',
          alignSelf: activeTab === 'Portfolio' ? 'flex-start' : 'flex-end',
          marginBottom: 20,
        }}
      />
      {activeTab === 'Portfolio' ? renderPortfolio() : renderExperience()}
    </View>
  );
};

export default WorkerOption;
