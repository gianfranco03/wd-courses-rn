import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from './styles';

const LoginScreen = props => {
  const {navigation} = props;

  return (
    <View style={styles.container}>
      <View>
        <Text>Hello from Login screen</Text>
        <TouchableOpacity
          onPress={() => navigation.replace('Home')}
          style={styles.button}>
          <Text style={styles.buttonText}>Go to Home Screen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
