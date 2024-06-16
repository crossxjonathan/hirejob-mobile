import {ScrollView, View} from 'react-native';
import React from 'react';
import MainWorkerProfile from '../../component/module/profile/worker/worker';
import LargeButtonPurple from '../../component/base/button/largebuttonpurple';
import LargeTransparentPurple from '../../component/base/button/largetransparentpurple';
import PersonalData from '../../component/module/profile/worker/personaldata';
import Skill from '../../component/module/Skill/skill';
import Experience from '../../component/module/profile/worker/experience';
import Portfolio from '../../component/module/profile/worker/portfolio';

const EditWorkerProfile = () => {
  return (
    <ScrollView>
      <View style={{padding: 20, gap: 20}}>
        <MainWorkerProfile />
        <View style={{padding: 10, gap: 10}}>
          <LargeButtonPurple label="Save" />
          <LargeTransparentPurple label="Cancel" />
        </View>
        <View>
          <PersonalData />
        </View>
        <View>
          <Skill />
        </View>
        <View>
          <Experience />
        </View>
        <View>
          <Portfolio />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditWorkerProfile;
