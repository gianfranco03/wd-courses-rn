import React from 'react';
import {View} from 'react-native';

import Navigator from '../../navigation';

const RootScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Navigator />
    </View>
  );
};

export default RootScreen;
