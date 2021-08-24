import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper'

import styles from './styles';

const AttendanceScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Hello from Attendance screen</Text>
        <Button icon="camera" onPress={() => { }} >
          Press me
        </Button>
      </View>
    </View>
  );
};

export default AttendanceScreen;
