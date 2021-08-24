import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Hello from Home screen</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
