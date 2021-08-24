import React from 'react';
import {SafeAreaView} from 'react-native';

import Navigator from '../../navigation';

const RootScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Navigator />
    </SafeAreaView>
  );
};

export default RootScreen;
