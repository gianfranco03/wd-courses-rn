import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Hello from About screen</Text>
      </View>
    </View>
  );
};

export default AboutScreen;
