import {ScrollView, View} from 'react-native';
import React from 'react';
import RecruiterProfiles from '../../component/module/profile/recruiter/recruiterProfile';

const RecruiterProfile = () => {
  return (
    <ScrollView>
      <View style={{padding: 20, gap: 20, position: 'relative', top: 20}}>
        <RecruiterProfiles />
      </View>
    </ScrollView>
  );
};

export default RecruiterProfile;
