import {ScrollView, View} from 'react-native';
import React from 'react';
import WorkerProfileDetail from '../../component/module/profile/worker/workerprofiledetail';
import WorkerOption from '../../component/module/profile/worker/workeroption';

const DetailWorker = ({route}) => {
  const {workers} = route.params;
  return (
    <ScrollView>
      <View style={{padding: 20, gap: 20, position: 'relative', top: 20}}>
        <WorkerProfileDetail workers={workers} />
      </View>
      <View style={{padding: 20, position: 'relative', top: 10}}>
        <WorkerOption workers={workers} />
      </View>
    </ScrollView>
  );
};

export default DetailWorker;
