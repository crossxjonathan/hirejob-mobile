import {ScrollView, View} from 'react-native';
import React from 'react';
import WorkerOption from '../../component/module/profile/worker/workeroption';
import WorkerProfiles from '../../component/module/profile/worker/workerprofiles';

const WorkerProfile = () => {
  return (
    <ScrollView>
      <View style={{padding: 20, gap: 20, position: 'relative', top: 20}}>
        <WorkerProfiles />
      </View>
      <View style={{padding: 20, position: 'relative', top: 10}}>
        <WorkerOption />
      </View>
    </ScrollView>
  );
};

export default WorkerProfile;
